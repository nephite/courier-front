import _ from 'lodash';


export const provincesWithoutPickUpLocation = [
  {
    "id": 93,
    "name": "Metro Manila",
    "is_pickup_available": "T"
  },
  {
    "id": 94,
    "name": "Abra",
    "is_pickup_available": "F"
  },
  {
    "id": 95,
    "name": "Agusan Del Norte",
    "is_pickup_available": "F"
  },
  {
    "id": 96,
    "name": "Agusan Del Sur",
    "is_pickup_available": "F"
  },
  {
    "id": 97,
    "name": "Aklan",
    "is_pickup_available": "F"
  },
  {
    "id": 98,
    "name": "Albay",
    "is_pickup_available": "F"
  },
  {
    "id": 99,
    "name": "Antique",
    "is_pickup_available": "F"
  },
  {
    "id": 100,
    "name": "Apayao",
    "is_pickup_available": "F"
  },
  {
    "id": 101,
    "name": "Aurora",
    "is_pickup_available": "F"
  },
  {
    "id": 102,
    "name": "Basilan",
    "is_pickup_available": "F"
  },
  {
    "id": 103,
    "name": "Bataan",
    "is_pickup_available": "F"
  },
  {
    "id": 104,
    "name": "Batanes",
    "is_pickup_available": "F"
  },
  {
    "id": 105,
    "name": "Batangas",
    "is_pickup_available": "F"
  },
  {
    "id": 106,
    "name": "Benguet",
    "is_pickup_available": "F"
  },
  {
    "id": 107,
    "name": "Biliran",
    "is_pickup_available": "F"
  },
  {
    "id": 108,
    "name": "Bohol",
    "is_pickup_available": "F"
  },
  {
    "id": 109,
    "name": "Bukidnon",
    "is_pickup_available": "F"
  },
  {
    "id": 110,
    "name": "Bulacan",
    "is_pickup_available": "T"
  },
  {
    "id": 111,
    "name": "Cagayan",
    "is_pickup_available": "F"
  },
  {
    "id": 112,
    "name": "Camarines Norte",
    "is_pickup_available": "F"
  },
  {
    "id": 113,
    "name": "Camarines Sur",
    "is_pickup_available": "F"
  },
  {
    "id": 114,
    "name": "Camiguin",
    "is_pickup_available": "F"
  },
  {
    "id": 115,
    "name": "Capiz",
    "is_pickup_available": "F"
  },
  {
    "id": 116,
    "name": "Cantanduanes",
    "is_pickup_available": "F"
  },
  {
    "id": 117,
    "name": "Cavite",
    "is_pickup_available": "T"
  },
  {
    "id": 118,
    "name": "Cebu",
    "is_pickup_available": "F"
  },
  {
    "id": 119,
    "name": "Cotabato",
    "is_pickup_available": "F"
  },
  {
    "id": 120,
    "name": "Davao Del Norte",
    "is_pickup_available": "F"
  },
  {
    "id": 121,
    "name": "Davao Del Sur",
    "is_pickup_available": "F"
  },
  {
    "id": 122,
    "name": "Davao Occidental",
    "is_pickup_available": "F"
  },
  {
    "id": 123,
    "name": "Davao Oriental",
    "is_pickup_available": "F"
  },
  {
    "id": 124,
    "name": "Davao de Oro",
    "is_pickup_available": "F"
  },
  {
    "id": 125,
    "name": "Dinagat Islands",
    "is_pickup_available": "F"
  },
  {
    "id": 126,
    "name": "Eastern Samar",
    "is_pickup_available": "F"
  },
  {
    "id": 127,
    "name": "Guimaras",
    "is_pickup_available": "F"
  },
  {
    "id": 128,
    "name": "Ifugao",
    "is_pickup_available": "F"
  },
  {
    "id": 129,
    "name": "Ilocos Norte",
    "is_pickup_available": "F"
  },
  {
    "id": 130,
    "name": "Ilocos Sur",
    "is_pickup_available": "F"
  },
  {
    "id": 131,
    "name": "Iloilo",
    "is_pickup_available": "F"
  },
  {
    "id": 132,
    "name": "Isabela",
    "is_pickup_available": "F"
  },
  {
    "id": 133,
    "name": "Kalinga",
    "is_pickup_available": "F"
  },
  {
    "id": 134,
    "name": "La Union",
    "is_pickup_available": "F"
  },
  {
    "id": 135,
    "name": "Laguna",
    "is_pickup_available": "T"
  },
  {
    "id": 136,
    "name": "Lanao Del Norte",
    "is_pickup_available": "F"
  },
  {
    "id": 137,
    "name": "Lanao Del Sur",
    "is_pickup_available": "F"
  },
  {
    "id": 138,
    "name": "Leyte",
    "is_pickup_available": "F"
  },
  {
    "id": 139,
    "name": "Maguindanao",
    "is_pickup_available": "F"
  },
  {
    "id": 140,
    "name": "Marinduque",
    "is_pickup_available": "F"
  },
  {
    "id": 141,
    "name": "Masbate",
    "is_pickup_available": "F"
  },
  {
    "id": 142,
    "name": "Misamis Occidental",
    "is_pickup_available": "F"
  },
  {
    "id": 143,
    "name": "Misamis Oriental",
    "is_pickup_available": "F"
  },
  {
    "id": 144,
    "name": "Mountain Province",
    "is_pickup_available": "F"
  },
  {
    "id": 145,
    "name": "Negros Occidental",
    "is_pickup_available": "F"
  },
  {
    "id": 146,
    "name": "Negros Oriental",
    "is_pickup_available": "F"
  },
  {
    "id": 147,
    "name": "Northern Samar",
    "is_pickup_available": "F"
  },
  {
    "id": 148,
    "name": "Nueva Ecija",
    "is_pickup_available": "F"
  },
  {
    "id": 149,
    "name": "Nueva Vizcaya",
    "is_pickup_available": "F"
  },
  {
    "id": 150,
    "name": "Occidental Mindoro",
    "is_pickup_available": "F"
  },
  {
    "id": 151,
    "name": "Oriental Mindoro",
    "is_pickup_available": "F"
  },
  {
    "id": 152,
    "name": "Palawan",
    "is_pickup_available": "F"
  },
  {
    "id": 153,
    "name": "Pampanga",
    "is_pickup_available": "F"
  },
  {
    "id": 154,
    "name": "Pangasinan",
    "is_pickup_available": "F"
  },
  {
    "id": 155,
    "name": "Quezon",
    "is_pickup_available": "F"
  },
  {
    "id": 156,
    "name": "Quirino",
    "is_pickup_available": "F"
  },
  {
    "id": 157,
    "name": "Rizal",
    "is_pickup_available": "T"
  },
  {
    "id": 158,
    "name": "Romblon",
    "is_pickup_available": "F"
  },
  {
    "id": 159,
    "name": "Samar",
    "is_pickup_available": "F"
  },
  {
    "id": 160,
    "name": "Sarangani",
    "is_pickup_available": "F"
  },
  {
    "id": 161,
    "name": "Suquijor",
    "is_pickup_available": "F"
  },
  {
    "id": 162,
    "name": "Sorsogon",
    "is_pickup_available": "F"
  },
  {
    "id": 163,
    "name": "South Cotabato",
    "is_pickup_available": "F"
  },
  {
    "id": 164,
    "name": "Southern Leyte",
    "is_pickup_available": "F"
  },
  {
    "id": 165,
    "name": "Sultan Kudarat",
    "is_pickup_available": "F"
  },
  {
    "id": 166,
    "name": "Sulu",
    "is_pickup_available": "F"
  },
  {
    "id": 167,
    "name": "Surigao Del Norte",
    "is_pickup_available": "F"
  },
  {
    "id": 168,
    "name": "Surigao Del Sur",
    "is_pickup_available": "F"
  },
  {
    "id": 169,
    "name": "Tarlac",
    "is_pickup_available": "F"
  },
  {
    "id": 170,
    "name": "Tawi-Tawi",
    "is_pickup_available": "F"
  },
  {
    "id": 171,
    "name": "Zambales",
    "is_pickup_available": "F"
  },
  {
    "id": 172,
    "name": "Zamboaga Del Norte",
    "is_pickup_available": "F"
  },
  {
    "id": 173,
    "name": "Zamboaga Del Sur",
    "is_pickup_available": "F"
  },
  {
    "id": 174,
    "name": "Zamboaga Sibugay",
    "is_pickup_available": "F"
  }
]

export const provincesWithPickUpLocation = _.filter(provincesWithoutPickUpLocation, function(province) { return province.is_pickup_available === 'T'; })
