const files = await Deno.readDir("../src/liturgy/psalter");

const ps119sections = [];

for await (const f of files) {
  if (f.isFile && f.name.startsWith("psalm-119")) {
    const data = JSON.parse(
      await Deno.readTextFile(`../src/liturgy/psalter/${f.name}`)
    );
    ps119sections.push({
      label: data.data[0].label,
      value: data.data[0].value[0],
    });
  }
}

const ps119 = ps119sections
  .sort((a, b) => a.value.value[0].number - b.value.value[0].number)
  .map(({ label, value }) => ({ ...value, label }));

await Deno.writeTextFile("psalm-119.json", JSON.stringify(ps119));

console.log(ps119sections.map((a) => a.value.value[0].number));
