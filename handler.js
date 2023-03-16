const repository = require('./repository');

function readContactHandler() {
  return repository.getPhoneNumber();
}

function deleteContactHandler(request, h) {
  // Get contact id from request
  const contactID = request.params.contact_id;

  // Delete from database by contact id
  const success = repository.deletePhoneNumber(contactID);

  // Check if successfully deleted
  if (!success) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal delete kontak. Mohon isi id dengan benar',
    });
    response.code(400);
    return response;
  }

  return 'Success';
}

function createContactHandler(request, h) {
  // Get data
  const { name, phone_number } = request.payload;

  // Check requested data
  if (
    name === undefined ||
    name === '' ||
    phone_number === undefined ||
    phone_number === ''
  ) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan kontak. Mohon isi nama kontak dan nomor telepon.',
    });
    response.code(400);
    return response;
  }

  // Save to database
  repository.savePhoneNumberToJson(name, phone_number);

  return `Success`;
}

module.exports = {
  readContactHandler,
  deleteContactHandler,
  createContactHandler,
};
