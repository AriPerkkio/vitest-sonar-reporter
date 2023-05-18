import { parseName } from '@shared';

export function renderUser(userName: string) {
    const { first, last } = parseName(userName);

    return `
      <div class="user">
        <span class="firstname">${first}</span>
        <span class="lastname">${last}</span>
      </div>
    `;
}
