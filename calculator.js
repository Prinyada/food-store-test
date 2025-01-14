const menu_price = {
  red: 50,
  green: 40,
  blue: 30,
  yellow: 50,
  pink: 80,
  purple: 90,
  orange: 120
}

class Calculator {
  calculatePrice(order, hasMemberCard) {
    let totalPrice = 0

    // คำนวณราคาทั้งหมด
    for (const [item, quantity] of Object.entries(order)) {
      if (menu_price[item] && quantity > 0) {
        totalPrice += menu_price[item] * quantity
      }
    }

    // กรณีสั่ง orange, pink, green อย่างละ 2 ขึ้นไป
    const discountDoublesItems = ["orange", "pink", "green"]
    let discount = 0

    for (const item of discountDoublesItems) {
      if (order[item] && order[item] >= 2) {
        discount += menu_price[item] * order[item] * 0.05 // ex. pink(2), green(2) -> ((80*2)*0.05) + ((40*2)*0.05) = ส่วนลดในออเดอร์นี้
      }
    }

    // ทั้งหมด - ส่วนลด
    totalPrice -= discount

    // ถ้าเป็นสมาชิกลดอีก 10%
    if (hasMemberCard) {
      totalPrice *= 0.9
    }

    return totalPrice
  }  
}

// ตัวอย่าง
const calculator = new Calculator()
const order1 = {
  red: 0,
  green: 1,
  blue: 0,
  yellow: 1,
  pink: 0,
  purple: 0,
  orange: 0
}

const order2 = {
  red: 0,
  green: 0,
  blue: 0,
  yellow: 0,
  pink: 3,
  purple: 0,
  orange: 0
}

console.log(calculator.calculatePrice(order1, true)); // case 1: เป็น member ลด 10%
console.log(calculator.calculatePrice(order2, false)); // case 2: สั่งในหมวด orange, pink, green อย่างละ 2 ขึ้นไป ลด 5% แต่ไม่เป็น member

module.exports = Calculator; // export ไปใช้ Calculator.test.js

// step run
// run normal : node calculator.js
// run unit test : npm test