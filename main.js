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

fetchDealsLimited();
