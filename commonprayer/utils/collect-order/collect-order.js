function collectOrder(allCollects, version) {
  const nodes = Array.from(document.getElementsByTagName("p"));
  const collects = allCollects.filter(d => (d.category.includes("Collect") || d.category.includes("Collect of the Day")) && !d.category.includes("LFF 2018"));
  const withNodes = collects.map(doc => ({
    doc,
    node: nodes.filter(n => n.innerText.replace(/\n/g, " ").startsWith(doc.value[0].slice(0, 50)))
  })).filter(d => d.node.length > 0).map(d => ({ doc: d.doc, node: d.node[0]}));
  const withLabels = withNodes.map(d => {
    const { doc, node } = d;
    let label;
    const possibleLabel = node.previousElementSibling.querySelector("strong"),
      secondaryOption = node.previousElementSibling.previousElementSibling.querySelector("strong");
    if(possibleLabel) {
      label = possibleLabel.innerText;
    } else if(secondaryOption) {
      label = secondaryOption.innerText;
    } else {
      label = "[missing label]"
    }
    return { doc, node, label };
  });
  const withSubtitles = withLabels.map(d => {
    const { doc, node, label } = d;
    let subtitle;
    const possibleLabel = node.previousElementSibling.querySelector("em"),
      secondaryOption = node.previousElementSibling.previousElementSibling.querySelector("em");
    if(possibleLabel) {
      subtitle = possibleLabel.innerText;
    } else if(secondaryOption && !secondaryOption.innerText.startsWith("Preface")) {
      subtitle = secondaryOption.innerText;
    } else {
      subtitle = null;
    }
    return { doc, node, label, subtitle };
  });
  const withIndices = withSubtitles.map(d => ({ ...d, index: nodes.indexOf(d.node)}));
  const sorted = withIndices.sort((a, b) => a.index - b.index);
  const asDocs = sorted.map(d => {
    const { doc, label, subtitle } = d;
    return {
      ...doc,
      date_created: undefined,
      date_modified: undefined,
      sharing: undefined,
      version,
      label,
      citation: subtitle,
    }
  });
  return { data: asDocs};
}