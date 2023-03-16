const fs = require('fs');
const { nanoid } = require('nanoid');

// Function to get Phone Number from Database
function getPhoneNumber() {
  let jsonData = fs.readFileSync('data.json');
  let data = JSON.parse(jsonData);
  return data;
}

// Function to delete Phone Number from Database
function deletePhoneNumber(id) {
  let jsonData = fs.readFileSync('data.json');
  let data = JSON.parse(jsonData);

  // search through data by looping
  const index = data.findIndex((temp) => temp.id === id);

  if (index === -1) {
    return false;
  }

  data.splice(index, 1);
  jsonData = JSON.stringify(data);
  fs.writeFileSync('data.json', jsonData);
  return true;
}

// Function to save Phone Number to Database
function savePhoneNumberToJson(name, phoneNumber) {
  let id = nanoid(8);
  let jsonData = fs.readFileSync('data.json');
  let data = JSON.parse(jsonData);
  data.push({
    id: id,
    name: name,
    phone_number: phoneNumber,
  });
  jsonData = JSON.stringify(data);
  fs.writeFileSync('data.json', jsonData);
}

module.exports = { getPhoneNumber, deletePhoneNumber, savePhoneNumberToJson };
