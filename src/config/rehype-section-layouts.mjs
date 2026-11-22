const disclosureId = /^(?:CVE-\d{4}-\d{4,}|GHSA-(?:[a-z0-9]{4}-){2}[a-z0-9]{4})$/i;

export const rehypeSectionLayouts = () => (tree, file) => {
  const frontmatter = file.data.astro?.frontmatter;
  const kind = frontmatter?.kind;
  if (kind !== 'timeline' && kind !== 'cves') return;

  const rows = [];
  let body;
  for (const node of tree.children) {
    if (node.type === 'element' && node.tagName === 'h3') {
      body = {
        type: 'element',
        tagName: 'div',
        properties: { className: [`${kind}-body`] },
        children: [],
      };
      rows.push({
        type: 'element',
        tagName: 'div',
        properties: { className: [`${kind}-entry`] },
        children: [node, body],
      });
    } else {
      (body?.children ?? rows).push(node);
    }
  }
  tree.children = rows;

  if (kind === 'cves') {
    const ids = new Set();
    const markDisclosures = (node) => {
      if (node.type === 'element' && node.tagName === 'a') {
        const label = node.children[0]?.value?.trim();
        if (node.children.length === 1 && label && disclosureId.test(label)) {
          node.properties.className = [...(node.properties.className ?? []), 'disclosure-badge'];
          ids.add(label.toUpperCase());
        }
      }
      node.children?.forEach(markDisclosures);
    };
    markDisclosures(tree);
    frontmatter.disclosureCount = ids.size;
  }
};
