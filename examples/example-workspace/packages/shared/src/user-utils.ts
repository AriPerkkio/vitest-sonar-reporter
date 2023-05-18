export function parseName(fullname: string) {
    const [first, last] = fullname.split(' ');
    return { first, last };
}

export function getInitials(fullname: string) {
    const { first, last } = parseName(fullname);
    return `${first[0]}.${last[0]}`;
}
