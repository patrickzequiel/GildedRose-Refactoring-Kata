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

  updateSellIn(item: Item) {
    item.sellIn -= 1;
  }

  updateQualityItem(item: Item) {
     const isSulfuras = item.name === "Sulfuras, Hand of Ragnaros";
      const isAgedBrie = item.name === "Aged Brie";
      const isBackstage =
        item.name === "Backstage passes to a TAFKAL80ETC concert";
      const isConjured = item.name === "Conjured Mana Cake";

      if (isSulfuras) return;
      if (isAgedBrie) {
        item.quality = this.increaseQuality(item.quality);
      }
      if (isBackstage) {
        item.quality = this.increaseQuality(item.quality);
        if (item.sellIn < 11) {
            item.quality = this.increaseQuality(item.quality);
          
        }
        if (item.sellIn < 6) {
          item.quality = this.increaseQuality(item.quality);
        }
      }
      if (!isAgedBrie && !isBackstage) {
        item.quality = this.decreaseQuality(item.quality, isConjured);
      }

      this.updateSellIn(item);

      if (item.sellIn < 0) {
        if (isBackstage) {
          item.quality = 0;
        }
        if (isAgedBrie) {
          item.quality = this.increaseQuality(item.quality);
        }

        if (!isAgedBrie && !isBackstage) {
          item.quality = this.decreaseQuality(item.quality, isConjured);
        }
      }
  }


  updateQuality() {
    this.items.forEach((item) => {
     this.updateQualityItem(item);
    });

    return this.items;
  }
}
