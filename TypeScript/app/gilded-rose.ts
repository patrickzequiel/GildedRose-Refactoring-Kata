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

  decreaseQuality(quality: number, isConjured: boolean) {
    const amount = isConjured ? 2 : 1;
    return Math.max(0, quality - amount);
  }

  increaseQuality(quality: number) {
    return Math.min(50, quality + 1);
  }

  decreaseSellIn(item: Item) {
    item.sellIn -= 1;
  }

  updateBrie(item: Item) {
    item.quality = this.increaseQuality(item.quality);
    this.decreaseSellIn(item);
    if (item.sellIn < 0) {
      item.quality = this.increaseQuality(item.quality);
    }
  }

  updateBackstage(item: Item) {
    item.quality = this.increaseQuality(item.quality);

    if (item.sellIn < 11) {
      item.quality = this.increaseQuality(item.quality);
    }
    if (item.sellIn < 6) {
      item.quality = this.increaseQuality(item.quality);
    }

    this.decreaseSellIn(item);

    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }

  updateNormal(item: Item, isConjured: boolean) {
    item.quality = this.decreaseQuality(item.quality, isConjured);

    this.decreaseSellIn(item);

    if (item.sellIn < 0) {
      item.quality = this.decreaseQuality(item.quality, isConjured);
    }
  }

  updateQualityItem(item: Item) {
    const isSulfuras = item.name === "Sulfuras, Hand of Ragnaros";
    const isAgedBrie = item.name === "Aged Brie";
    const isBackstage =
      item.name === "Backstage passes to a TAFKAL80ETC concert";
    const isConjured = item.name === "Conjured Mana Cake";

    if (isSulfuras) return;

    if (isAgedBrie) return this.updateBrie(item);

    if (isBackstage) return this.updateBackstage(item);

    return this.updateNormal(item, isConjured);
  }

  updateQuality() {
    this.items.forEach((item) => {
      this.updateQualityItem(item);
    });

    return this.items;
  }
}
