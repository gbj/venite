Object.entries(by_slug).filter(([slug, docs]) => slug.includes("psalm_")).map(([slug, docs]) => [slug.replace("en-bcp1979-", "es-loc-"), docs.map(doc => {
	{
		const s = sal.find(s => s.number == doc.metadata.number);
		const first_section = s.sections[0];
		const localname = `Salmo ${doc.metadata.number}${first_section.local_name ? `: ${first_section.local_name}` : ""}`
		const es_doc = {
			...doc,
			language: "es",
			version: "loc",
			source: {
				source: "LOC",
				citation: `p. ${first_section.reference.page}`
			},
			label: localname,
			metadata: {
				...doc.metadata,
				localname: localname,
				latinname: first_section.latin_name
			},
			value: doc.value.map(section => section.value.map(verse => {
				const es_verse = s.sections.map(section => section.verses).flat().find(es_verse => es_verse.number == verse.number);
				if (es_verse) {
					return { number: verse.number, verse: es_verse.a, halfverse: es_verse.b };
				} else {
					return { number: "HELP" }
				}
			}))
		}
		return es_doc;
	}
})]).reduce((acc, [slug, docs]) => {
	acc[slug] = docs;
	return acc;
}, {})