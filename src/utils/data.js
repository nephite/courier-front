import _ from 'lodash';


export const provincesWithoutPickUpLocation = [
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 49,
      "is_pickup_available": "T",
      "name": "Metro Manila"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 42,
      "is_pickup_available": "T",
      "name": "Laguna"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 53,
      "is_pickup_available": "F",
      "name": "Negros Occidental"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 54,
      "is_pickup_available": "F",
      "name": "Negros Oriental"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 55,
      "is_pickup_available": "F",
      "name": "Northern Samar"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 56,
      "is_pickup_available": "F",
      "name": "Nueva Ecija"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 57,
      "is_pickup_available": "F",
      "name": "Nueva Vizcaya"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 58,
      "is_pickup_available": "F",
      "name": "Occidental Mindoro"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 59,
      "is_pickup_available": "F",
      "name": "Oriental Mindoro"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 60,
      "is_pickup_available": "F",
      "name": "Palawan"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 52,
      "is_pickup_available": "F",
      "name": "Mountain Province"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 51,
      "is_pickup_available": "F",
      "name": "Misamis Oriental"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 43,
      "is_pickup_available": "F",
      "name": "Lanao Del Norte"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 44,
      "is_pickup_available": "F",
      "name": "Lanao Del Sur"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 45,
      "is_pickup_available": "F",
      "name": "Leyte"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 46,
      "is_pickup_available": "F",
      "name": "Maguindanao"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 47,
      "is_pickup_available": "F",
      "name": "Marinduque"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 48,
      "is_pickup_available": "F",
      "name": "Masbate"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 50,
      "is_pickup_available": "F",
      "name": "Misamis Occidental"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 61,
      "is_pickup_available": "F",
      "name": "Pampanga"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 62,
      "is_pickup_available": "F",
      "name": "Pangasinan"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 63,
      "is_pickup_available": "F",
      "name": "Quezon"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 74,
      "is_pickup_available": "F",
      "name": "Sulu"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 75,
      "is_pickup_available": "F",
      "name": "Surigao Del Norte"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 76,
      "is_pickup_available": "F",
      "name": "Surigao Del Sur"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 77,
      "is_pickup_available": "F",
      "name": "Tarlac"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 78,
      "is_pickup_available": "F",
      "name": "Tawi-Tawi"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 79,
      "is_pickup_available": "F",
      "name": "Zambales"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 80,
      "is_pickup_available": "F",
      "name": "Zamboaga Del Norte"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 81,
      "is_pickup_available": "F",
      "name": "Zamboaga Del Sur"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 73,
      "is_pickup_available": "F",
      "name": "Sultan Kudarat"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 72,
      "is_pickup_available": "F",
      "name": "Southern Leyte"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 64,
      "is_pickup_available": "F",
      "name": "Quirino"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 65,
      "is_pickup_available": "T",
      "name": "Rizal"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 66,
      "is_pickup_available": "F",
      "name": "Romblon"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 67,
      "is_pickup_available": "F",
      "name": "Samar"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 68,
      "is_pickup_available": "F",
      "name": "Sarangani"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 69,
      "is_pickup_available": "F",
      "name": "Suquijor"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 70,
      "is_pickup_available": "F",
      "name": "Sorsogon"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 71,
      "is_pickup_available": "F",
      "name": "South Cotabato"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 82,
      "is_pickup_available": "F",
      "name": "Zamboaga Sibugay"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 1,
      "is_pickup_available": "F",
      "name": "Abra"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 12,
      "is_pickup_available": "F",
      "name": "Batangas"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 13,
      "is_pickup_available": "F",
      "name": "Benguet"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 14,
      "is_pickup_available": "F",
      "name": "Biliran"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 15,
      "is_pickup_available": "F",
      "name": "Bohol"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 16,
      "is_pickup_available": "F",
      "name": "Bukidnon"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 17,
      "is_pickup_available": "T",
      "name": "Bulacan"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 18,
      "is_pickup_available": "F",
      "name": "Cagayan"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 19,
      "is_pickup_available": "F",
      "name": "Camarines Norte"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 11,
      "is_pickup_available": "F",
      "name": "Batanes"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 10,
      "is_pickup_available": "F",
      "name": "Bataan"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 2,
      "is_pickup_available": "F",
      "name": "Agusan Del Norte"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 3,
      "is_pickup_available": "F",
      "name": "Agusan Del Sur"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 4,
      "is_pickup_available": "F",
      "name": "Aklan"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 5,
      "is_pickup_available": "F",
      "name": "Albay"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 6,
      "is_pickup_available": "F",
      "name": "Antique"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 7,
      "is_pickup_available": "F",
      "name": "Apayao"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 8,
      "is_pickup_available": "F",
      "name": "Aurora"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 9,
      "is_pickup_available": "F",
      "name": "Basilan"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 20,
      "is_pickup_available": "F",
      "name": "Camarines Sur"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 21,
      "is_pickup_available": "F",
      "name": "Camiguin"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 22,
      "is_pickup_available": "F",
      "name": "Capiz"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 33,
      "is_pickup_available": "F",
      "name": "Eastern Samar"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 34,
      "is_pickup_available": "F",
      "name": "Guimaras"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 35,
      "is_pickup_available": "F",
      "name": "Ifugao"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 36,
      "is_pickup_available": "F",
      "name": "Ilocos Norte"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 37,
      "is_pickup_available": "F",
      "name": "Ilocos Sur"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 38,
      "is_pickup_available": "F",
      "name": "Iloilo"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 39,
      "is_pickup_available": "F",
      "name": "Isabela"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 40,
      "is_pickup_available": "F",
      "name": "Kalinga"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 32,
      "is_pickup_available": "F",
      "name": "Dinagat Islands"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 31,
      "is_pickup_available": "F",
      "name": "Davao de Oro"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 23,
      "is_pickup_available": "F",
      "name": "Cantanduanes"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 24,
      "is_pickup_available": "T",
      "name": "Cavite"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 25,
      "is_pickup_available": "F",
      "name": "Cebu"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 26,
      "is_pickup_available": "F",
      "name": "Cotabato"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 27,
      "is_pickup_available": "F",
      "name": "Davao Del Norte"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 28,
      "is_pickup_available": "F",
      "name": "Davao Del Sur"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 29,
      "is_pickup_available": "F",
      "name": "Davao Occidental"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 30,
      "is_pickup_available": "F",
      "name": "Davao Oriental"
  },
  {
      "created_timestamp": "2021-04-17T01:51:53",
      "id": 41,
      "is_pickup_available": "F",
      "name": "La Union"
  }
]

export const provincesWithPickUpLocation = _.filter(provincesWithoutPickUpLocation, function(province) { return province.is_pickup_available === 'T'; })

export const greater_manila = ['', '']

export const RATES = {
  metro_manila: {
    s_m: {
        cod: 90,
        non_cod: 60,
    },
    l: {
      cod: 100,
      non_cod: 70,
    },
    xl: {
      cod: 130,
      non_cod: 90,
    },
    own_packaging: {
      cod: 150,
      non_cod: 120,
    }
  },
  cavite: {
    s_m: {
        cod: 130,
        non_cod: 90,
    },
    l: {
      cod: 140,
      non_cod: 100,
    },
    xl: {
      cod: 160,
      non_cod: 120,
    },
    own_packaging: {
      cod: 180,
      non_cod: 150,
    }
  },
  bulacan: {
    s_m: {
        cod: 140,
        non_cod: 100,
    },
    l: {
      cod: 150,
      non_cod: 110,
    },
    xl: {
      cod: 170,
      non_cod: 130,
    },
    own_packaging: {
      cod: 220,
      non_cod: 180,
    }
  },
  laguna: {
    s_m: {
        cod: 140,
        non_cod: 100,
    },
    l: {
      cod: 150,
      non_cod: 110,
    },
    xl: {
      cod: 170,
      non_cod: 130,
    },
    own_packaging: {
      cod: 220,
      non_cod: 190,
    }
  },
  rizal_a: {
    s_m: {
        cod: 120,
        non_cod: 80,
    },
    l: {
      cod: 130,
      non_cod: 90,
    },
    xl: {
      cod: 150,
      non_cod: 110,
    },
    own_packaging: {
      cod: 180,
      non_cod: 150,
    }
  },
  rizal_b: {
    s_m: {
        cod: 140,
        non_cod: 100,
    },
    l: {
      cod: 150,
      non_cod: 110,
    },
    xl: {
      cod: 170,
      non_cod: 130,
    },
    own_packaging: {
      cod: 220,
      non_cod: 180,
    }
  }
}
