let accessToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQxYTZhMmEyODE5NmU3NzYyODAxZmRiMTc0ZWJiYzFmOGYwNjRiN2ZiYTVkYTE0ODhmMzk1MGFlMjg2ZGYzZWQxMWNiZTA2ZWJkNDliMzNlIn0.eyJhdWQiOiIzM2M4ZWY2My00NGMzLTQ3N2QtOGQ3Ny0zZDRiMWJjN2QzOTkiLCJqdGkiOiI0MWE2YTJhMjgxOTZlNzc2MjgwMWZkYjE3NGViYmMxZjhmMDY0YjdmYmE1ZGExNDg4ZjM5NTBhZTI4NmRmM2VkMTFjYmUwNmViZDQ5YjMzZSIsImlhdCI6MTcxMDAzMDE5OSwibmJmIjoxNzEwMDMwMTk5LCJleHAiOjE3MTEyMzg0MDAsInN1YiI6IjEwNzc4Mjg2IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNjIxMjU0LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiNTE2YTBkNTYtYTkwYy00OTgxLTgzMzktZjhjYjg1ZjIyMGE0In0.mipRY0awFsUzH45BhWB_X4QE5UXy43E9XqP_BoM91p7jK1mKQ3EdyrTipkwFNF5VJYBaepyF7g6DQDqo3GUAygny-a0j93skvR-IWV3fFEKDLmB_X57McsoOhagY3VZDdOukWW568OnbvVOBXzt9aIQ9MX3jfuxF_7XJPzVkKmaKn13hCr5h6krDcb4I4cF6DNNVC8t5FIy17ZF87_xub2n4TvkuTXo5HKWxXejKpJdqlsFvMvb2zacBmscPp6WfT68Yzp3ri660nuZFeDnuAXiVIqUCkALTFdcBlmklFxmQ8WxfwnhYJhYAoTByClHvQapKMb_8HL5_zEtR8JueEA';

let api_endpoint =
  'https://cors-anywhere.herokuapp.com/https://devkuba.amocrm.ru/api/v4/leads';

let pageSize = 5;
let currentPage = 1;

async function getDeals() {
  const response = await fetch(
    `${api_endpoint}?limit=${pageSize}&page=${currentPage}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await response.json();
  console.log(data._embedded.leads);
  return data._embedded.leads;
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
  const date = new Date(timestamp * 1000); // умножаем на 1000, так как timestamp обычно в секундах, а Date требует миллисекунды
  const day = date.getDate();
  const month = date.getMonth() + 1; // добавляем 1, так как месяцы в JavaScript начинаются с 0
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${day}.${month}.${year} / ${hours}:${minutes}`;

  return formattedDate;
}

async function fetchDealsWithDelay() {
  const deals = await getDeals();
  renderDeals(deals);
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
    }, 1000); // задержка 1 секунда
  }
}

// fetchDealsLimited();

function getToken() {
  const client_id = '33c8ef63-44c3-477d-8d77-3d4b1bc7d399';
  const client_secret =
    'eamr1ChZFLjPkAds9hD79RuDeVSh349mbsi8GtEWHOzagVoBMViJzadJztVdrCeI';
  const redirect_uri = 'https://dk-dev10.github.io/emmfy';
  const code =
    'def50200e21ac8ad61e2a559339248103abce9e4bcf8c057f53f486434226d8274551b7532f04d44ab1b9b80b58b713d2208ebcba861e5b1ab83c7789a76832211e296cc6ee9339da33e5e50851e9b3c916809869849a8e7deb1e87a1f60f922dc6bf6de1a66b8972dea98993968f6018c3149fd7d171017bac98446b95a0e30384890ea7b27cf3e311beadfc7921c5b67dfa09226d03a08824613da1504f7bf25bbd007aee6020c543f26616b35dbd021b6ee0b82967fd154176e72b07e38ceb0ce90a81e2662e2d6860726eb9ce5bdde89588ffe0f649fdff69d7c09b839e6ce9d57342b76265d7e19e69d4c5eb66e043676816241c5bcd2943fc7fc894fe10c035081d0b2a23d210f9ce6aac66df06d2b7c69e09c1a6ce9fbbb47e5fc225097726702a44c9ac87a2255c6be90ab5a5b27915fe8e4aa628e36fe978b81b727513331aa1fc22e0717e1efc6c6c73ef1c3cc1ee362d1dd289f43f3f32e7baae4722e5e0179e731d1b94647ce946526ba49e465bf6c84000facb8eacd56beb5c7db03888ba64e4b85f6540b5d53c26193c6b5d4f2bfc0bdc09cc3f4a3b056ff424ec0d69d5c8011455b408736fc375f34a1bf6f5ac826cad4e0d5afba655aba350b84cc7715d62f3ca98789ce1839eaeef5eb7c435d7f7569f72f37fe5b4a21799a096cab3be11d7a2d65fae653b3a941d000';

  let data = new URLSearchParams();
  data.append('client_id', client_id);
  data.append('client_secret', client_secret);
  data.append('redirect_uri', redirect_uri);
  data.append('code', code);
  data.append('grant_type', 'authorization_code');

  fetch(
    'https://cors-anywhere.herokuapp.com/https://devkuba.amocrm.ru/oauth2/access_token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((data) => console.log('data:', data))
    .catch((error) => {
      console.error('Error:', error);
    });
}

getToken();
