import assert from 'node:assert/strict';
import { test } from 'node:test';
import { rehypeSectionLayouts } from '../src/config/rehype-section-layouts.mjs';

const element = (tagName, children = []) => ({ type: 'element', tagName, properties: {}, children });
const link = (label) => element('a', [{ type: 'text', value: label }]);

function renderSection(kind, children) {
  const tree = { type: 'root', children };
  const frontmatter = { kind };
  rehypeSectionLayouts()(tree, { data: { astro: { frontmatter } } });
  return { tree, frontmatter };
}

test('timeline groups all blocks between dates', () => {
  const [intro, firstDate, paragraph, continuation, quote, list, secondDate, finalParagraph] =
    ['p', 'h3', 'p', 'p', 'blockquote', 'ul', 'h3', 'p'].map((tag) => element(tag));
  const { tree } = renderSection('timeline', [
    intro, firstDate, paragraph, continuation, quote, list, secondDate, finalParagraph,
  ]);

  const [preamble, first, second] = tree.children;
  assert.equal(tree.children.length, 3);
  assert.equal(preamble, intro);
  assert.equal(first.children[0], firstDate);
  assert.deepEqual(first.children[1].children, [paragraph, continuation, quote, list]);
  assert.equal(second.children[0], secondDate);
  assert.deepEqual(second.children[1].children, [finalParagraph]);
});

test('disclosure badges count unique CVE and GHSA labels', () => {
  const links = ['CVE-2024-7357', 'cve-2024-7357', 'GHSA-abcd-1234-efgh', 'Vendor website'].map(link);
  const { frontmatter } = renderSection('cves', [
    element('h3'),
    element('ul', links.map((anchor) => element('li', [anchor]))),
  ]);

  assert.equal(frontmatter.disclosureCount, 2);
  assert.deepEqual(links.map((anchor) => anchor.properties.className), [
    ['disclosure-badge'], ['disclosure-badge'], ['disclosure-badge'], undefined,
  ]);
});
