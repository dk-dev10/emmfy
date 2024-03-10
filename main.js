// Укажите ваши данные для авторизации
let subdomain = 'justdkuba';
let client_id = '33c8ef63-44c3-477d-8d77-3d4b1bc7d399';
let client_secret =
  '6yjVpXx66DSqOgvuCO2FNGQ4ZMa4pErC6aqDyq7nOjh3tkMM4wCP1yGvOgVc3hYL';
let redirect_uri = 'http://127.0.0.1:5500';
let code =
  'def502003bb0ad80b75561de76d142a87e1f5c748df382beba14aecb5fc032fc404742fb4fe5f9f56889eaea2c9722976777ed3e877aba54eff59c623594c481cb05b7032440b286d8a62eac845ebb48ca5e197b305819b28525b6066a44b24769a7fe44a65657c61d44bc338e214e937b1fc9ae7fae6f414499ff21635b586dc2d274aeaa9430101be229dd7affeb0bd9c9e56961255c0f6a2172f7433bacaf0cced4c6938af0aaa576f8f3e96debd9ebea5961574d1b311fa070abd273bb469d55130bda79b29b5ecee7f6d9884319675e0662312abe41a9112cb7633ae8aeaf39c725df19c79d2501d7ab61293ee5a014ea4341a53c37801e5800859103ae1adc519ee23fe8c23865e94eb3566009becadaa926d7986fc5f0a21c3b5b56f1d2f21505678c3ad7bf59c4273bf419090e27d490c7485a184e47c4b41865eae269a2a2129554be796074bf8836c54da636748ec83baea4cc7d5c657a8c665729e1d294ad3d27d41035fe31ffb72532524e972c638bd89566d180fb7d12e513804a777a64a24857706a7fc8fa980aa81789c997af2ef8934c7eedb47d62c0b71ed9ddc49ae2b167bf93306154a48e16d27256a9bae66b32b0c93f6b4de5523cbe294604eafd685d161fa6a72b4ec3990a816818d21b71ea6f89a93ee805b8b8baa1619d4a204ab806.eyJhdWQiOiJjMGI1MjEwNC1mN2M4LTQzODYtYTRhZC04MjgzYjUzMGUwZmQiLCJqdGkiOiJhZjM5NGNmMGQxNzU0MWQwNTI4NjcyMjRlYmE2ZTAwNDJhNWY3NjI4MTQ0MzJmZTM1OWM5NjhmNmQxOGRiNDg1NmI4Mjc0MTVmMzQzYjU1MSIsImlhdCI6MTcxMDAyMDY1NSwibmJmIjoxNzEwMDIwNjU1LCJleHAiOjE3MTEyMzg0MDAsInN1YiI6IjEwNzc4Mjg2IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNjIxMTYyLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiNGUxYjk5Y2ItMDk2Ni00NzhjLWI3N2UtNjM3ODU4YTNiYzJlIn0.iCFoXQlkRmRXcjj6EsKf0wF9OJMPVP7MdYNb0pCFCS82df0j1qz7fbFFy9lVr52OWyNsyYWdrP9Ajcm6XExFKsjn8yd_AzNv9r48EgWXAc25saOibIRAcZrXTyxDNWJhK2E5UxSIYu9kGKqMOYjjaGdwbhxoA5gkeJmvtmLjDAWCSBgZeW9gdBoe6RsOKXn0f2IPFM3BnajeQT-OPhEsdngGd6i9_vizYzq1oVA_ANi1nZP9KC8faQl53UbVOn6K9TwbJaA18-f17e9Ah6p8uhJZgZpA0PMuX8GNe7Cb5vfxyZBoFHQMMAMZA7hakY1lERtsvmDQHrA5ZahXFnVbfA';

// Формируем данные для запроса
let data = new URLSearchParams();
data.append('client_id', client_id);
data.append('client_secret', client_secret);
data.append('redirect_uri', redirect_uri);
data.append('code', code);

// Отправляем POST запрос для получения access_token и refresh_token

function tt() {
  fetch(
    `https://cors-anywhere.herokuapp.com/https://${subdomain}.amocrm.ru/oauth2/access_token`,
    {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
      },
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error fetching tokens');
      }
    })
    .then((data) => {
      console.log('Access Token:', data.access_token);
      console.log('Access Token:', data.get('access_token'));
      console.log('Refresh Token:', data.refresh_token);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// let access_token =
// 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijc0MzA1NzUxMjZkYmYzMjBmYzUyNjg2ODY0NGUzYTRmNTMwZGRlMjhmNGYyNmFhOTBkMjQwODlhYzYyYzgwNmIyMmNmMGYyZGU4NWYxMTRmIn0.eyJhdWQiOiIzM2M4ZWY2My00NGMzLTQ3N2QtOGQ3Ny0zZDRiMWJjN2QzOTkiLCJqdGkiOiI3NDMwNTc1MTI2ZGJmMzIwZmM1MjY4Njg2NDRlM2E0ZjUzMGRkZTI4ZjRmMjZhYTkwZDI0MDg5YWM2MmM4MDZiMjJjZjBmMmRlODVmMTE0ZiIsImlhdCI6MTcxMDAyMzYwNCwibmJmIjoxNzEwMDIzNjA0LCJleHAiOjE3MTA2MzM2MDAsInN1YiI6IjEwNzc4Mjg2IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNjIxMjU0LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiMjRhZmM4N2QtNjQ3MC00ZGEwLWI1ZjEtZWUxNTllYWYwMzFjIn0.XiBduTm8gMASzB5qBqhtd5vsWp9n5tpqmbnsGdQ4uy9ARdlVFC0-8c_ICYSzB_gFapo0jzoXO72Vgh-tiRV9BdHfQhKxmCsUw2N962mt_Eupuqh_Np0zxHAMhSKDjNQjwWxDrQbiqIQZVxQnX39Mx3WVyr62UeHXzgRwAKScH4__FXORR0d5Z56UtLLmYVhy2OzYSX7g0viClXfSghMSxkKHxwMm2YUp9J4UlkeOnd8sdO70okeo_jAQd-jmaUWmXpeM_cXTuIhgKKpayMROtfpYcaTDMAEk-jaGYCi5rs2sxBD2tWCY_BI-TskIZPKFiwtJdq1cSr7LUqUjDrnVEA';
// let refresh_token = 'YOUR_REFRESH_TOKEN';
let api_endpoint =
  'https://cors-anywhere.herokuapp.com/https://justdkuba.amocrm.ru';

// 'def502002b920c9a5622004bfb7be49c5ad69b806dc58f0f8b4d635a51180e497b90ff6872247326e3f8a05341009d65775f99e870a331251ecdcd077c89fe85bee2d6db0f1cfdfbf43778f0342bdec12862335d4b7412d36dba2b09e447df911f80cdd6747da78dd1db77ef9f836e689c9ce66786e459fdb7dfe5286879d7f4a421344fa71bb1cad9717205750aefbe3ce7222bdbcb4bae8c4abeba8253ac0adbf18029ce671ca5467f95fe7ce975c40b0be2037e81b963aa6d79a21a7698eab8d59f320179dbe7362beebdbaa933b029b12136006c9b69a0f5ab3591410939c2206dbf9041d7462fc0b5bb78c7488138db2ee30e3163aa3ff095e75ede8cfa171610e3abc74a588ed2786e019a2b395c6a491705aa745a18d083e99ba6829be16657d3f0a84f161272395999b3af40b8603b9e47ee2f24ebcf53c0848435c4524ad32aa90f0cacc802417d088cd88c3564caaf066cd89c92401f4c1998b23241bcf181dfec247046309db44e2aae5c826fb672c61b4ee258e454607ac73238088ac75ea81a866271d10f27681ead43412c4ed26c510df469ea3e74a2b7384007f6e61d6750e041d2a579a5cccf0f8762c90c6fb0bcf3a0ed16b07a524f0bb10ed2845e035219f7cec4e1612c4256f487e55aa5219880fea0e299d85b8485701950122dca7712f0'

let limit = 5;
let page = 1;
let sort = 'budget';
let sort_direction = 'asc';

function fetchLeads() {
  fetch(
    `${api_endpoint}?limit=${limit}&page=${page}&sort=${sort}&sort_direction=${sort_direction}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error fetching leads');
      }
    })
    .then((data) => {
      displayLeads(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function displayLeads(data) {
  let table = document.createElement('table');
  let headerRow = table.insertRow();
  headerRow.insertCell().textContent = 'Deal Name';
  headerRow.insertCell().textContent = 'Budget';
  // Add more cells for other fields

  data._embedded.leads.forEach((lead) => {
    let row = table.insertRow();
    row.insertCell().textContent = lead.name;
    row.insertCell().textContent = lead.budget;
    // Add more cells for other fields
  });

  document.getElementById('leadsTable').innerHTML = '';
  document.getElementById('leadsTable').appendChild(table);
}

// fetchLeads();

function getToken() {
  const client_id = '33c8ef63-44c3-477d-8d77-3d4b1bc7d399';
  const client_secret =
    'eamr1ChZFLjPkAds9hD79RuDeVSh349mbsi8GtEWHOzagVoBMViJzadJztVdrCeI';
  const redirect_uri = 'https://dk-dev10.github.io/emmfy';
  const code =
    'def502007892e64bf8b9f3c59748c9cd130a6836952330ac91de6e8e45f46d482be9d24baa79a28a7cf6422b0a1efaedc92c116b9f8f65325b8433dbe6cd96c32d8c8db4e33323e191ccee2d04c482d7472063e004d4c972502e8a0e96ca4dc160c56ae86c5c0a6a7ccf6fcdb23f84b7cc3a3bb9e0f7bc14cc696491ea01788956cde3ceb5ea31e5fef5dce19436ef911bc32009d1e7f222fe2b0b70e739e5fc5dcfa6dfd3e36276acd54ec4000cb81826926c7010c10fa9ebed15c41f049e4cfdbdfe77c8a42a092414cdf08d6342bf652a4bc63c74f89648182131974a77e714e7ddf75cd781542373caa64093224ba443e43bd4d01d0b1c4fa9ccacf8f92f6606e02f2344e63c71ecff7174b9cf3061eb29af93aa1e45ff4ec02f3e66f5b0e76627bf3de8ca6582afb5e2ba8c4c775bbb5dd9d233f5dcb3969a89849040274138d61662cc4edf4a8b193149869982cd36d84e438109388e9f5734be845e0b987a6d7f21942ca4881b81d3237296622c8a7b47868bbcb6f5e4695ef03ff7fddb4d2cc07e8a83f66970cc1327457878d01d6c4d0199e477a682848ab1ee070608c42754f0ee7e6d61ccbe0833aec10dfb48d88279b10439d3be5b09d02a7ac40db9c5a8b1c1bf35a319352ac62415fbfff8a1ddfbcf44df3100b698e22593e07f73dd8f432e7437';

  let data = new URLSearchParams();
  data.append('client_id', client_id);
  data.append('client_secret', client_secret);
  data.append('redirect_uri', redirect_uri);
  data.append('code', code);
  data.append('grant_type', 'authorization_code');

  fetch(
    'https://cors-anywhere.herokuapp.com/https://justdkuba.amocrm.com/oauth2/access_token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const accessToken = data.access_token;
      console.log('data:', data);
      console.log('Access Token:', accessToken);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

getToken();
