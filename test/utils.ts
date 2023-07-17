function removeDurations(report: string) {
    return report.replace(/duration="\d*"/g, 'duration="123"');
}

function removeCwd(report: string) {
    return report.replace(new RegExp(process.cwd(), 'g'), '<process-cwd>');
}

function removeLineNumbers(report: string) {
    return report.replace(/\.[mj|j|t]s:\d*:\d*/g, '.js');
}

function limitStacktraces(report: string) {
    return report.replace(
        /<(failure|error).*>(\S|\s)*?<\/(failure|error)>/g,
        (stacktrace) => {
            const rows = stacktrace.split('\n');
            const padding = rows[2].match(/\s*/)?.pop();

            return rows
                .slice(0, 3)
                .concat(`${padding}<removed-stacktrace>`)
                .concat(rows[rows.length - 1])
                .join('\n');
        },
    );
}

function compose(
    ...fns: ((text: string) => string)[]
): (text: string) => string {
    return fns.reduceRight(
        (prevFn, nextFn) => (text: string) => nextFn(prevFn(text)),
        (value) => value,
    );
}

export function stabilizeReport(report: string) {
    return compose(
        limitStacktraces,
        removeCwd,
        removeLineNumbers,
        removeDurations,
        (text) => text.trim(),
    )(report);
}
