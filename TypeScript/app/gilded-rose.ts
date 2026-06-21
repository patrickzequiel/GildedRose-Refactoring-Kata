const ITEM = {
  SULFURAS: "Sulfuras, Hand of Ragnaros",
  AGED_BRIE: "Aged Brie",
  BACKSTAGE: "Backstage passes to a TAFKAL80ETC concert",
  CONJURED: "Conjured Mana Cake",
} as const;

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  decreaseQuality(item: Item) {
    const amount = item.name === ITEM.CONJURED ? 2 : 1;

    item.quality = Math.max(0, item.quality - amount);
  }

  increaseQuality(item: Item) {
    item.quality = Math.min(50, item.quality + 1);
  }

  decreaseSellIn(item: Item) {
    item.sellIn -= 1;
  }

  updateBrie(item: Item) {
    this.increaseQuality(item);
    this.decreaseSellIn(item);
    if (item.sellIn < 0) {
      this.increaseQuality(item);
    }
  }

  updateBackstage(item: Item) {
    this.increaseQuality(item);

    if (item.sellIn <= 10) {
      this.increaseQuality(item);
    }
    if (item.sellIn <= 5) {
      this.increaseQuality(item);
    }

    this.decreaseSellIn(item);

    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }

  updateNormal(item: Item) {
    this.decreaseQuality(item);
    this.decreaseSellIn(item);
    if (item.sellIn < 0) {
      this.decreaseQuality(item);
    }
  }

  updateQualityItem(item: Item) {
    const isSulfuras = item.name === ITEM.SULFURAS;
    const isAgedBrie = item.name === ITEM.AGED_BRIE;
    const isBackstage = item.name === ITEM.BACKSTAGE;

    if (isSulfuras) return;

    if (isAgedBrie) return this.updateBrie(item);

    if (isBackstage) return this.updateBackstage(item);

    return this.updateNormal(item);
  }

  updateQuality() {
    this.items.forEach((item) => {
      this.updateQualityItem(item);
    });

    return this.items;
  }
}
