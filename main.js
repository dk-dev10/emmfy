let accessToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQxYTZhMmEyODE5NmU3NzYyODAxZmRiMTc0ZWJiYzFmOGYwNjRiN2ZiYTVkYTE0ODhmMzk1MGFlMjg2ZGYzZWQxMWNiZTA2ZWJkNDliMzNlIn0.eyJhdWQiOiIzM2M4ZWY2My00NGMzLTQ3N2QtOGQ3Ny0zZDRiMWJjN2QzOTkiLCJqdGkiOiI0MWE2YTJhMjgxOTZlNzc2MjgwMWZkYjE3NGViYmMxZjhmMDY0YjdmYmE1ZGExNDg4ZjM5NTBhZTI4NmRmM2VkMTFjYmUwNmViZDQ5YjMzZSIsImlhdCI6MTcxMDAzMDE5OSwibmJmIjoxNzEwMDMwMTk5LCJleHAiOjE3MTEyMzg0MDAsInN1YiI6IjEwNzc4Mjg2IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNjIxMjU0LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiNTE2YTBkNTYtYTkwYy00OTgxLTgzMzktZjhjYjg1ZjIyMGE0In0.mipRY0awFsUzH45BhWB_X4QE5UXy43E9XqP_BoM91p7jK1mKQ3EdyrTipkwFNF5VJYBaepyF7g6DQDqo3GUAygny-a0j93skvR-IWV3fFEKDLmB_X57McsoOhagY3VZDdOukWW568OnbvVOBXzt9aIQ9MX3jfuxF_7XJPzVkKmaKn13hCr5h6krDcb4I4cF6DNNVC8t5FIy17ZF87_xub2n4TvkuTXo5HKWxXejKpJdqlsFvMvb2zacBmscPp6WfT68Yzp3ri660nuZFeDnuAXiVIqUCkALTFdcBlmklFxmQ8WxfwnhYJhYAoTByClHvQapKMb_8HL5_zEtR8JueEA';

let api_endpoint =
  'https://cors-anywhere.herokuapp.com/https://devkuba.amocrm.ru/api/v4/leads';
// https://cors-anywhere.herokuapp.com/  перейти нажать кнопку для прокси

const select = document.querySelector('select');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const counterPage = document.querySelector('#counterPage');
const sortInputs = document.querySelectorAll('.sort  input');

let nextPage = true;
let prevPage = false;
let countPage = 1;
let limitPage = 5;
let leads = [];
let sorting = 'name';

function sortLead() {
  if (sorting === 'name') {
    leads.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    leads.sort((a, b) => a[sorting] - b[sorting]);
  }
  renderDeals(leads);
}

sortInputs.forEach((inp) => {
  inp.addEventListener('click', (e) => {
    sorting = e.target.value;
    sortLead();
  });
});

function checkPrevNext(btn) {
  prev.disabled = btn?.prev ? false : true;
  next.disabled = btn?.next ? false : true;
  counterPage.textContent = countPage;
}

select.addEventListener('change', async (e) => {
  limitPage = e.target.value ? e.target.value : 5;
  fetchDealsLimited();
});

prev.addEventListener('click', () => {
  countPage -= 1;
  fetchDealsLimited();
});
next.addEventListener('click', () => {
  countPage += 1;
  fetchDealsLimited();
});

async function getDeals() {
  try {
    const response = await fetch(
      `${api_endpoint}?limit=${limitPage}&page=${countPage}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();

    checkPrevNext(data._links);

    return data._embedded.leads;
  } catch (e) {
    console.log(e);
    return [];
  }
}

function renderDeals(deals) {
  const tbody = document.querySelector('#dealsTable tbody');
  tbody.innerHTML = '';
  deals.forEach((deal) => {
    const row = document.createElement('tr');
    row.innerHTML = `
          <td>${deal.name}</td>
          <td>${deal.price}</td>
          <td>${formatTimestamp(deal.created_at)}</td>
          <td>${formatTimestamp(deal.updated_at)}</td>
          <td>${deal.responsible_user_id}</td>
      `;
    tbody.appendChild(row);
  });
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${day}.${month}.${year} / ${hours}:${minutes}`;

  return formattedDate;
}

async function fetchDealsWithDelay() {
  const deals = await getDeals();
  leads = deals;
  renderDeals(leads);
}

let requestCount = 0;

async function fetchDealsLimited() {
  if (requestCount < 2) {
    await fetchDealsWithDelay();
    requestCount++;
  } else {
    setTimeout(() => {
      requestCount = 0;
      fetchDealsLimited();
    }, 1000);
  }
}

fetchDealsLimited();

function getToken() {
  const client_id = 'd16f2d4a-1b08-465d-9765-4541e34af422';
  const client_secret =
    'oR0Ajg3ys1bGW01fjCO9eywodX5wcJUCF4Yq60acm18EXcvQDEoXr1rkFUIKO7Ou';
  const redirect_uri = 'http://localhost:5500';
  const code =
    'def5020024520c566cbd4fea5e7c97ac422b93ed61c5dabd655fae3b785843cb6b695a4c2dbf4237195fc19fbd71580f024eac63a6358860f832ec8be9368c7fdddfe77f45c814f59704a869ccbd2a61dfb40e00d154986148766f3f032d3cc3bc40779dfef1114133edca8faaf96d1e3b545c106d69b88672347065262a90e942e530da17d68e4648567339ee42a99df70c29b47f49bb1702ef7b0b66e33979d8c2ad517055777322574142681cc5bf9cce38d1753ae53053530d0b963443960d1aac516d8ca8adbc479542a21f393333ee966c54b633a3a088f8f79cf7c5a0cf77fdde528bdc9e86b86b51ffea1feac8756624d75223e5856b5031c736cec94464d618fb9606392ef925ed4c3ab245b8e72770693ef999e9292f2c63fa12acba24d59a0dcd2a784b241df8199bad1241293380b2542aaa266cbda28002f641859c1aaa2feb5706e0d1c3922f2276bdb605cb6260d352c421249d35dda1f20996af231765644968b841978368f3d2e9e2958ec9800206b15d0aea58fd8dd1dfc9574908013c860825b654e4bf63814339c430dfb7992613f9e4b41176ef54a1f7e8fa995bcf33ac928d4d45f5413bfa088d3a774c1932e9d6c6e72e24d744299bb4a08620e9d33faa6489de668406b0a689aa91d1c1f6e1f6238e41ca4f301b47c6af082cda';

  const data = {
    client_id: client_id,
    client_secret: client_secret,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirect_uri,
  };

  fetch(
    'https://cors-anywhere.herokuapp.com/https://devkuba.amocrm.ru/oauth2/access_token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Context-User-ID': '31621254',
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

getToken();
