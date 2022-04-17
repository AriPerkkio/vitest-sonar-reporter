import type { File, Task, Test } from 'vitest';

import { escapeXML } from './xml-escape.js';

const NEWLINE = '\n';

/**
 * Generate XML. Reference:
 *
 * ```xml
 * <testExecutions version="1">
 *   <file path="testx/ClassOneTest.xoo">
 *     <testCase name="test1" duration="5"/>
 *     <testCase name="test2" duration="500">
 *       <skipped message="short message">other</skipped>
 *     </testCase>
 *     <testCase name="test3" duration="100">
 *       <failure message="short">stacktrace</failure>
 *     </testCase>
 *     <testCase name="test4" duration="500">
 *       <error message="short">stacktrace</error>
 *     </testCase>
 *   </file>
 * </testExecutions>
 * ```
 */
export function generateXml(files?: File[]) {
    return join(
        '<testExecutions version="1">',
        NEWLINE,
        ...(files?.map(generateFileElement).join(NEWLINE) || []),
        NEWLINE,
        '</testExecutions>'
    );
}

function generateFileElement(file: File) {
    return join(
        indent(1),
        `<file path="${escapeXML(file.name)}">`,
        NEWLINE,
        generateTestCases(file),
        NEWLINE,
        indent(1),
        `</file>`
    );
}

function generateTestCases(file: File) {
    const tests = file.tasks.map(getAllTests).flat();

    return tests.map(generateTestCaseElement).join(NEWLINE);
}

function generateTestCaseElement(test: Test) {
    const start = join(
        indent(2),
        '<testCase ',
        `name="${escapeXML(generateTestCaseName(test))}"`,
        getDurationAttribute(test)
    );

    if (test.result?.state === 'fail') {
        const element =
            test.result.error?.name === 'AssertionError' ? 'failure' : 'error';

        return join(
            start,
            '>',
            NEWLINE,
            indent(3),
            `<${element} message="${escapeXML(test.result.error?.message)}">`,
            NEWLINE,
            indent(4),
            `<![CDATA[${escapeXML(test.result.error?.stack)}]]>`,
            NEWLINE,
            indent(3),
            `</${element}>`,
            NEWLINE,
            indent(2),
            '</testCase>'
        );
    }

    if (
        test.mode === 'skip' ||
        test.mode === 'todo' ||
        // These might work in future?
        test.result?.state === 'skip' ||
        test.result?.state === 'todo'
    ) {
        return join(
            start,
            '>',
            NEWLINE,
            indent(3),
            `<skipped message="${escapeXML(test.name)}" />`,
            NEWLINE,
            indent(2),
            '</testCase>'
        );
    }

    return join(start, ' />');
}

function getAllTests(task: Task): Test[] {
    const tests: Test[] = [];

    if (task.type === 'test') {
        return [...tests, task];
    }

    return [...tests, ...task.tasks.map(getAllTests).flat()];
}

function getDurationAttribute(test: Test): string {
    const duration = test.result?.duration;

    if (typeof duration !== 'number') {
        return '';
    }

    return ` duration="${Math.round(duration)}"`;
}

function generateTestCaseName(task: Task): string {
    if (task.suite && task.suite.name) {
        return `${generateTestCaseName(task.suite)} - ${task.name}`;
    }

    return task.name;
}

function join(...lines: (string | undefined)[]) {
    return lines.filter(Boolean).join('');
}

function indent(level: number) {
    return '  '.repeat(level);
}
