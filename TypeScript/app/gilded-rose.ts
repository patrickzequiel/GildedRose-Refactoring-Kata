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
      const amount = isConjured ? 2 : 1
      return Math.max(0, quality - amount)
  }

  updateSellIn(item: Item, isSulfuras: boolean) {
    if (!isSulfuras) {
      item.sellIn = item.sellIn - 1;
    }
  }

  updateQuality() {
    this.items.forEach((item) => {
      const isSulfuras = item.name === 'Sulfuras, Hand of Ragnaros'
      const isAgedBrie = item.name === 'Aged Brie';
      const isBackstage = item.name === 'Backstage passes to a TAFKAL80ETC concert'
      const isConjured = item.name === 'Conjured Mana Cake';

        if (!isAgedBrie && !isBackstage) {
          if (item.quality > 0) {
            if (!isSulfuras) {
              item.quality = this.decreaseQuality(item.quality, isConjured);
            }
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1
            if (isBackstage) {
              if (item.sellIn < 11) {
                if (item.quality < 50) {
                  item.quality = item.quality + 1
                }
              }
              if (item.sellIn < 6) {
                if (item.quality < 50) {
                  item.quality = item.quality + 1
                }
              }
            }
          }
        }

        this.updateSellIn(item, isSulfuras);

        if (item.sellIn < 0) {

          if (isBackstage) {
            item.quality = 0
          }
          if (isAgedBrie && item.quality < 50) {
            item.quality += 1;
          }

          if (!isAgedBrie && !isBackstage && !isSulfuras) {
            item.quality = this.decreaseQuality(item.quality, isConjured);
          }
        }

    })

    return this.items;
  }
}
