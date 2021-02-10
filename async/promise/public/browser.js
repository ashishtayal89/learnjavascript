const phoneList = ["Apple", "Samsung"];
const phoneDetail = {
  name: "Apple",
  color: "black",
  price: 100000
};

const fetchPhoneList = callback => {
  setTimeout(() => callback(phoneList), 2000);
};

const fetchPhoneDetail = callback => {
  setTimeout(() => callback(phoneDetail), 1000);
};

const afterDetailsFetch = details => console.log(details);

fetchPhoneList(() => {
  fetchPhoneDetail(details => afterDetailsFetch(details));
});

const fetchPhoneListPromise = () =>
  new Promise(resolve => setTimeout(() => resolve(phoneList), 2000));

const fetchPhoneDetailPromise = () =>
  new Promise(resolve => setTimeout(() => resolve(phoneDetail), 1000));

fetchPhoneListPromise()
  .then(fetchPhoneDetailPromise)
  .then(afterDetailsFetch);
