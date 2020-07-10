import { parseESVResponse } from '../src/esv';

describe('parseESVResponse', () => {
  it('should handle ordinary prose', () => {
    expect(parseESVResponse('John 3:16-18', JOHN_3_16_18)).toEqual([
      { book: 'John', chapter: '3', verse: '16', text: '\u201cFor God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life. ' },
      { book: 'John', chapter: '3', verse: '17', text: 'For God did not send his Son into the world to condemn the world, but in order that the world might be saved through him. ' }
    ])
  })
})

const JOHN_3_16_18 = JSON.parse(`{"query": "John 3:16\u201317", "canonical": "John 3:16\u201317", "parsed": [[43003016, 43003017]], "passage_meta": [{"canonical": "John 3:16\u201317", "chapter_start": [43003001, 43003036], "chapter_end": [43003001, 43003036], "prev_verse": 43003015, "next_verse": 43003018, "prev_chapter": [43002001, 43002025], "next_chapter": [43004001, 43004054]}], "passages": ["  [16] \u201cFor God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life. [17] For God did not send his Son into the world to condemn the world, but in order that the world might be saved through him. (ESV)"]}`);
