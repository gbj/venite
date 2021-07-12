import { CanticleTableEntry } from "https://cdn.skypack.dev/@venite/ldf@^0.20.3";

export class CanticleTableServiceController {
  private _cache: Promise<Record<string, CanticleTableEntry[]>>;

  async tables(): Promise<Record<string, CanticleTableEntry[]>> {
    if (!this._cache) {
      const resp = await fetch(`/assets/canticle-table.json`);
      this._cache = resp.json();
    }
    return this._cache;
  }

  async findEntry(
    table: string,
    nth: number,
    fallbackTable: string = undefined
  ): Promise<CanticleTableEntry[]> {
    const tables = await this.tables();

    return fallbackTable
      ? (tables[`${table ?? "Rite-II"}-${nth}`] || []).concat(
          tables[`${fallbackTable}-${nth}`] || []
        )
      : tables[`${table ?? "Rite-II"}-${nth}`] || [];
  }
}

export const CanticleTableService = new CanticleTableServiceController();
