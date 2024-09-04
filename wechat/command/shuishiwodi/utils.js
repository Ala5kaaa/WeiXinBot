// 通过名字查找联系人
async function findContactByName(bot, name) {
  const contact = await bot.Contact.find({ name });
  return contact;
}
