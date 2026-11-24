const disclosureId = /^(?:CVE-\d{4}-\d{4,}|GHSA-(?:[a-z0-9]{4}-){2}[a-z0-9]{4})$/i;

export const rehypeSectionLayouts = () => (tree, file) => {
  const frontmatter = file.data.astro?.frontmatter;
  const kind = frontmatter?.kind;
  if (kind !== 'timeline' && kind !== 'cves') return;

  const rows = [];
  let body = null;
  let currentGroupHeading = null;
  const groups = [];

  for (const node of tree.children) {
    if (node.type === 'element' && node.tagName === 'h2') {
      body = null;
      node.properties = {
        ...node.properties,
        className: [...(node.properties?.className ?? []), `${kind}-group-heading`],
      };
      currentGroupHeading = node;
      groups.push({ heading: node, nodes: [] });
      rows.push(node);
    } else if (node.type === 'element' && node.tagName === 'h3') {
      body = {
        type: 'element',
        tagName: 'div',
        properties: { className: [`${kind}-body`] },
        children: [],
      };
      const entry = {
        type: 'element',
        tagName: 'div',
        properties: { className: [`${kind}-entry`] },
        children: [node, body],
      };
      rows.push(entry);
      if (currentGroupHeading) groups.at(-1).nodes.push(entry);
    } else {
      (body?.children ?? rows).push(node);
      if (currentGroupHeading && !body) groups.at(-1).nodes.push(node);
    }
  }
  tree.children = rows;

  if (kind === 'cves') {
    const collectIds = (node, targetSet) => {
      if (node.type === 'element' && node.tagName === 'a') {
        const label = node.children[0]?.value?.trim();
        if (node.children.length === 1 && label && disclosureId.test(label)) {
          node.properties.className = [...(node.properties.className ?? []), 'disclosure-badge'];
          targetSet.add(label.toUpperCase());
        }
      }
      node.children?.forEach((child) => collectIds(child, targetSet));
    };

    const ids = new Set();
    collectIds(tree, ids);
    frontmatter.disclosureCount = ids.size;

    for (const group of groups) {
      const groupIds = new Set();
      group.nodes.forEach((n) => collectIds(n, groupIds));
      if (groupIds.size > 0) {
        group.heading.children.push({
          type: 'element',
          tagName: 'span',
          properties: { className: ['cves-group-count'] },
          children: [{ type: 'text', value: String(groupIds.size) }],
        });
      }
    }
  }
};
