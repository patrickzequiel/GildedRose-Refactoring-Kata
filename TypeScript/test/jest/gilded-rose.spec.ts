import { Item, GildedRose } from '@/gilded-rose';

/**
 * Helper: advances one day for a single item and returns the result.
 * Keeps each test focused on the business rule, not on setup noise.
 */
const afterOneDay = (name: string, sellIn: number, quality: number): Item => {
  const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);
  return gildedRose.updateQuality()[0];
};

describe('Gilded Rose', () => {
  describe('Normal item', () => {
    it('GIVEN a normal item WHEN a day passes THEN sellIn and quality each drop by 1', () => {
      const item = afterOneDay('Elixir of the Mongoose', 10, 20);

      expect(item.sellIn).toBe(9);
      expect(item.quality).toBe(19);
    });

    it('GIVEN the sell-by date has passed WHEN a day passes THEN quality drops twice as fast', () => {
      const item = afterOneDay('Elixir of the Mongoose', 0, 20);

      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(18);
    });

    it('GIVEN quality is already 0 WHEN a day passes THEN quality never goes negative', () => {
      const item = afterOneDay('Elixir of the Mongoose', 5, 0);

      expect(item.quality).toBe(0);
    });
  });

  describe('Aged Brie (gets better with age)', () => {
    it('GIVEN Aged Brie WHEN a day passes THEN quality increases by 1', () => {
      const item = afterOneDay('Aged Brie', 5, 20);

      expect(item.sellIn).toBe(4);
      expect(item.quality).toBe(21);
    });

    it('GIVEN the sell-by date has passed WHEN a day passes THEN quality increases by 2', () => {
      const item = afterOneDay('Aged Brie', 0, 20);

      expect(item.quality).toBe(22);
    });

    it('GIVEN quality is at the max of 50 WHEN a day passes THEN quality never exceeds 50', () => {
      const item = afterOneDay('Aged Brie', 5, 50);

      expect(item.quality).toBe(50);
    });
  });

  describe('Sulfuras (legendary, never changes)', () => {
    it('GIVEN Sulfuras WHEN a day passes THEN sellIn and quality stay the same', () => {
      const item = afterOneDay('Sulfuras, Hand of Ragnaros', 5, 80);

      expect(item.sellIn).toBe(5);
      expect(item.quality).toBe(80);
    });

    it('GIVEN the sell-by date has passed WHEN a day passes THEN quality stays at 80', () => {
      const item = afterOneDay('Sulfuras, Hand of Ragnaros', -1, 80);

      expect(item.quality).toBe(80);
    });
  });

  describe('Backstage passes (more valuable as the concert nears)', () => {
    const PASS = 'Backstage passes to a TAFKAL80ETC concert';

    it('GIVEN more than 10 days left WHEN a day passes THEN quality increases by 1', () => {
      const item = afterOneDay(PASS, 15, 20);

      expect(item.quality).toBe(21);
    });

    it('GIVEN 10 days or less left WHEN a day passes THEN quality increases by 2', () => {
      const item = afterOneDay(PASS, 10, 20);

      expect(item.quality).toBe(22);
    });

    it('GIVEN 5 days or less left WHEN a day passes THEN quality increases by 3', () => {
      const item = afterOneDay(PASS, 5, 20);

      expect(item.quality).toBe(23);
    });

    it('GIVEN quality near the cap WHEN a day passes THEN quality never exceeds 50', () => {
      const item = afterOneDay(PASS, 5, 49);

      expect(item.quality).toBe(50);
    });

    it('GIVEN the concert has passed WHEN a day passes THEN quality drops to 0', () => {
      const item = afterOneDay(PASS, 0, 20);

      expect(item.quality).toBe(0);
    });
  });

  describe('Conjured item (degrades twice as fast)', () => {
    // NOTE: These describe the REQUIRED behaviour and will fail until the
    // "Conjured" feature is implemented in updateQuality().
    it('GIVEN a Conjured item WHEN a day passes THEN quality drops by 2', () => {
      const item = afterOneDay('Conjured Mana Cake', 5, 20);

      expect(item.quality).toBe(18);
    });

    it('GIVEN the sell-by date has passed WHEN a day passes THEN quality drops by 4', () => {
      const item = afterOneDay('Conjured Mana Cake', 0, 20);

      expect(item.quality).toBe(16);
    });

    it('GIVEN low quality WHEN a day passes THEN quality never goes negative', () => {
      const item = afterOneDay('Conjured Mana Cake', 5, 1);

      expect(item.quality).toBe(0);
    });
  });
});
