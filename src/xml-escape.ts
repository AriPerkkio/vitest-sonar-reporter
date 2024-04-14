/*
 * XML escape functions, mostly copied from vitest itself
 * - https://github.com/vitest-dev/vitest/issues/1144
 */

type PatternAndReplace = [RegExp, string];

// Characters to be replaced/encoded
const PATTERN_AMP: PatternAndReplace = [/&/g, '&amp;'];
const PATTERN_QUOTE: PatternAndReplace = [/"/g, '&quot;'];
const PATTERN_APOS: PatternAndReplace = [/'/g, '&apos;'];
const PATTERN_LT: PatternAndReplace = [/</g, '&lt;'];
const PATTERN_GT: PatternAndReplace = [/>/g, '&gt;'];

// Forbidden characters which are completely removed
const PATTERN_FORBIDDEN_XML_TO_REMOVE =
    // eslint-disable-next-line no-control-regex
    /((?:[\0-\x08\x0B\f\x0E-\x1F\uFFFD\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/g;

// Discouraged characters which are completely removed
const PATTERN_DISCOURAGED_XML_TO_REMOVE = new RegExp(
    '([\\x7F-\\x84]|[\\x86-\\x9F]|[\\uFDD0-\\uFDEF]|(?:\\uD83F[\\uDFFE\\uDFFF])|(?:\\uD87F[\\uDF' +
        'FE\\uDFFF])|(?:\\uD8BF[\\uDFFE\\uDFFF])|(?:\\uD8FF[\\uDFFE\\uDFFF])|(?:\\uD93F[\\uDFFE\\uD' +
        'FFF])|(?:\\uD97F[\\uDFFE\\uDFFF])|(?:\\uD9BF[\\uDFFE\\uDFFF])|(?:\\uD9FF[\\uDFFE\\uDFFF])' +
        '|(?:\\uDA3F[\\uDFFE\\uDFFF])|(?:\\uDA7F[\\uDFFE\\uDFFF])|(?:\\uDABF[\\uDFFE\\uDFFF])|(?:\\' +
        'uDAFF[\\uDFFE\\uDFFF])|(?:\\uDB3F[\\uDFFE\\uDFFF])|(?:\\uDB7F[\\uDFFE\\uDFFF])|(?:\\uDBBF' +
        '[\\uDFFE\\uDFFF])|(?:\\uDBFF[\\uDFFE\\uDFFF])(?:[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uD7FF\\' +
        'uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|' +
        '(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF]))',
    'g',
);

export function escapeXML(value: unknown): string {
    const text = String(value);

    const escaped = text
        // Note that replacement of & has to be first one, as escapes themselves contain &
        .replace(PATTERN_AMP[0], PATTERN_AMP[1])
        .replace(PATTERN_QUOTE[0], PATTERN_QUOTE[1])
        .replace(PATTERN_APOS[0], PATTERN_APOS[1])
        .replace(PATTERN_LT[0], PATTERN_LT[1])
        .replace(PATTERN_GT[0], PATTERN_GT[1]);

    return removeInvalidXMLCharacters(escaped);
}

// https://gist.github.com/john-doherty/b9195065884cdbfd2017a4756e6409cc
function removeInvalidXMLCharacters(text: string): string {
    return text
        .replace(PATTERN_FORBIDDEN_XML_TO_REMOVE, '')
        .replace(PATTERN_DISCOURAGED_XML_TO_REMOVE, '');
}
