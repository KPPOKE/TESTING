import macanDahan from '@/assets/macan-dahan-illustration.jpg';
import kelelawarBuah from '@/assets/kelelawar-buah-illustration.jpg';
import harimauSumatera from '@/assets/sumatran-tiger-illustration.jpg';
import gajahSumatera from '@/assets/gajah-sumatera-illustration.jpg';
import badakSumatera from '@/assets/badak-sumatera-illustration.jpg';
import babirusa from '@/assets/babirusa-illustration.jpg';
import badakJawa from '@/assets/javan-rhino-illustration.jpg';
import orangutanTapanuli from '@/assets/orangutan-tapanuli-illustration.jpg';
import lutungJawa from '@/assets/lutung-jawa-illustration.jpg';
import orangutanKalimantan from '@/assets/orangutan-illustration.jpg';
import kanguruPohon from '@/assets/kanguru-pohon-illustration.jpg';
import tarsius from '@/assets/tarsius-illustration.jpg';

export interface Animal {
  id: string;
  localName: string;
  latinName: string;
  illustration: string;
  habitat: string;
  foodType: string;
  population: string;
  conservationStatus: 'Critically Endangered' | 'Endangered' | 'Vulnerable' | 'Near Threatened' | 'Least Concern';
  uniqueCharacteristics: string[];
  funFact: string;
  description: string;
}

export const indonesianAnimals: Animal[] = [
  {
    id: 'macan-dahan',
    localName: 'Macan Dahan',
    latinName: 'Neofelis diardi',
    illustration: macanDahan,
    habitat: 'Hutan hujan tropis di Sumatera dan Kalimantan',
    foodType: 'Karnivora (kera, burung, mamalia kecil)',
    population: '≈ 3,000–7,000 di Sumatera',
    conservationStatus: 'Vulnerable',
    uniqueCharacteristics: [
      'Bintik-bintik seperti awan di seluruh tubuhnya',
      'Gigi taring sangat panjang untuk ukuran kepala',
      'Ekor panjang membantu keseimbangan saat memanjat',
      'Pemalu dan pandai memanjat pohon'
    ],
    funFact: 'Bisa bergelantungan di dahan, bahkan turun dari pohon secara mundur dan tidak bisa mengaum seperti singa!',
    description: 'Macan Dahan atau Clouded Leopard adalah kucing liar yang pandai memanjat dengan pola bulu unik seperti awan. Mereka terkenal karena gigi taringnya yang sangat panjang.'
  },
  {
    id: 'kelelawar-buah',
    localName: 'Kelelawar Buah Raksasa Papua',
    latinName: 'Pteropus vampyrus',
    illustration: kelelawarBuah,
    habitat: 'Hutan di Papua, Sulawesi, dan Maluku',
    foodType: 'Herbivora (buah-buahan dan madu)',
    population: 'Masih cukup banyak',
    conservationStatus: 'Least Concern',
    uniqueCharacteristics: [
      'Sayap sangat lebar (lebih dari 1 meter)',
      'Kemampuan penglihatan dan penciuman tajam',
      'Aktif di malam hari',
      'Dapat terbang jarak jauh'
    ],
    funFact: 'Bisa terbang jauh untuk mencari makan—beberapa jenis bahkan terbang hingga 25 mil dalam sekali jalan malam!',
    description: 'Kelelawar Buah Raksasa adalah mamalia terbang terbesar di Indonesia. Mereka membantu penyebaran biji buah-buahan di hutan.'
  },
  {
    id: 'harimau-sumatera',
    localName: 'Harimau Sumatera',
    latinName: 'Panthera tigris sondaica',
    illustration: harimauSumatera,
    habitat: 'Hutan hujan di Sumatera dari dataran rendah hingga pegunungan',
    foodType: 'Karnivora (rusa, babi hutan)',
    population: '≈ 400–500 ekor',
    conservationStatus: 'Critically Endangered',
    uniqueCharacteristics: [
      'Tubuh cokelat keoranyean dengan belang hitam tebal dan rapat',
      'Lebih kecil dari harimau lain tapi punya cakar dan otot kuat',
      'Perenang yang handal',
      'Pemburu soliter yang terampil'
    ],
    funFact: 'Hanya tersisa satu jenis harimau di Indonesia yang masih hidup setelah harimau Jawa dan Bali punah!',
    description: 'Harimau Sumatera adalah satu-satunya subspesies harimau yang tersisa di Indonesia. Mereka adalah kucing besar yang sangat langka dan terancam punah.'
  },
  {
    id: 'gajah-sumatera',
    localName: 'Gajah Sumatera',
    latinName: 'Elephas maximus sumatranus',
    illustration: gajahSumatera,
    habitat: 'Hutan tropis Sumatera dari dataran rendah hingga pegunungan',
    foodType: 'Herbivora (daun, ranting, buah)',
    population: '< 1,100 ekor',
    conservationStatus: 'Critically Endangered',
    uniqueCharacteristics: [
      'Memiliki belalai panjang dan gading kecil',
      'Ukuran tubuh lebih kecil dibanding gajah Asia lainnya',
      'Sangat cerdas dan berumur panjang',
      'Hidup dalam kelompok keluarga'
    ],
    funFact: 'Dulu habitatnya luas, tapi sekitar 70% hutan Sumatera sudah hilang dalam beberapa dekade terakhir!',
    description: 'Gajah Sumatera adalah subspesies gajah Asia yang hanya ada di Sumatera. Mereka menghadapi ancaman serius dari hilangnya habitat.'
  },
  {
    id: 'badak-sumatera',
    localName: 'Badak Sumatera',
    latinName: 'Dicerorhinus sumatrensis',
    illustration: badakSumatera,
    habitat: 'Hutan hujan tropis lebat, rawa-rawa, dan daerah pegunungan di Sumatera dan Kalimantan',
    foodType: 'Herbivora (daun muda, ranting, kulit pohon, buah)',
    population: '< 80 ekor',
    conservationStatus: 'Critically Endangered',
    uniqueCharacteristics: [
      'Badak terkecil di dunia',
      'Punya dua cula (satu besar di depan, satu kecil di belakang)',
      'Tubuhnya ditutupi bulu halus',
      'Sangat pemalu dan sulit terlihat'
    ],
    funFact: 'Disebut juga "badak berambut" dan adalah kerabat terdekat badak purba yang sudah hidup jutaan tahun lalu!',
    description: 'Badak Sumatera adalah spesies badak paling langka di dunia. Mereka adalah badak berambut satu-satunya yang masih hidup.'
  },
  {
    id: 'babirusa',
    localName: 'Babirusa Sulawesi',
    latinName: 'Babyrousa celebensis',
    illustration: babirusa,
    habitat: 'Hutan hujan, hutan rawa, dan daerah dekat sungai di Sulawesi',
    foodType: 'Omnivora (buah-buahan, daun, akar, jamur, hewan kecil)',
    population: 'Beberapa ribu ekor (menurun)',
    conservationStatus: 'Vulnerable',
    uniqueCharacteristics: [
      'Gigi taring melengkung ke atas menembus moncong seperti "tanduk"',
      'Tubuh lebih ramping daripada babi hutan biasa',
      'Endemik Sulawesi',
      'Perenang yang baik'
    ],
    funFact: 'Julukannya "babi rusa" karena taringnya mirip tanduk rusa, dan taring jantan terus tumbuh sepanjang hidupnya!',
    description: 'Babirusa adalah babi liar unik yang hanya ada di Sulawesi. Mereka terkenal karena taring yang tumbuh menembus moncongnya seperti tanduk.'
  },
  {
    id: 'badak-jawa',
    localName: 'Badak Jawa',
    latinName: 'Rhinoceros sondaicus',
    illustration: badakJawa,
    habitat: 'Taman Nasional Ujung Kulon, Banten',
    foodType: 'Herbivora (daun, tunas, ranting, buah)',
    population: '≈ 82 ekor',
    conservationStatus: 'Critically Endangered',
    uniqueCharacteristics: [
      'Badak bercula satu',
      'Kulitnya tebal berlipat-lipat seperti baju baja',
      'Ukurannya lebih kecil dibanding badak India',
      'Sangat sulit ditemukan dan pemalu'
    ],
    funFact: 'Semua badak Jawa dunia hanya ada di Indonesia dan disebut "harta karun hidup"!',
    description: 'Badak Jawa adalah salah satu mamalia paling langka di dunia. Semua populasi badak Jawa yang tersisa hanya ada di Taman Nasional Ujung Kulon.'
  },
  {
    id: 'orangutan-tapanuli',
    localName: 'Orang Utan Tapanuli',
    latinName: 'Pongo tapanuliensis',
    illustration: orangutanTapanuli,
    habitat: 'Hutan Batang Toru, Sumatera Utara',
    foodType: 'Omnivora (buah, biji, daun, bunga, serangga kecil)',
    population: '< 800 ekor',
    conservationStatus: 'Critically Endangered',
    uniqueCharacteristics: [
      'Rambut cokelat agak kemerahan',
      'Wajah jantan dewasa lebih lebar dibanding orangutan lain',
      'Lebih kecil tubuhnya daripada orangutan Sumatera dan Kalimantan',
      'Spesies yang baru ditemukan tahun 2017'
    ],
    funFact: 'Satu-satunya spesies kera besar yang hidup hanya di satu daerah kecil dan disebut "orangutan paling langka di dunia"!',
    description: 'Orang Utan Tapanuli adalah spesies orangutan yang paling baru ditemukan dan paling langka. Mereka hanya hidup di hutan Batang Toru.'
  },
  {
    id: 'lutung-jawa',
    localName: 'Lutung Jawa',
    latinName: 'Trachypithecus auratus',
    illustration: lutungJawa,
    habitat: 'Hutan tropis dan pegunungan di Pulau Jawa dan Bali',
    foodType: 'Herbivora (daun, bunga, buah, biji)',
    population: 'Menurun karena kehilangan habitat',
    conservationStatus: 'Vulnerable',
    uniqueCharacteristics: [
      'Bulu hitam mengkilap pada dewasa',
      'Bayi berwarna oranye terang saat lahir',
      'Ekor panjang untuk keseimbangan',
      'Hidup berkelompok dengan pemimpin jantan'
    ],
    funFact: 'Bayi lutung lahir berwarna oranye terang, lalu berubah menjadi hitam ketika dewasa!',
    description: 'Lutung Jawa adalah primata endemik Pulau Jawa dan Bali. Mereka terkenal karena perubahan warna bulu dari oranye menjadi hitam.'
  },
  {
    id: 'orangutan-kalimantan',
    localName: 'Orang Utan Kalimantan',
    latinName: 'Pongo pygmaeus',
    illustration: orangutanKalimantan,
    habitat: 'Hutan hujan tropis Kalimantan',
    foodType: 'Omnivora (buah, daun, madu, serangga, biji)',
    population: '≈ 50,000–60,000 ekor (menurun)',
    conservationStatus: 'Critically Endangered',
    uniqueCharacteristics: [
      'Tubuh besar, berbulu cokelat kemerahan',
      'Jantan dewasa punya "pipi lebar" yang disebut flensa',
      'Lengan sangat panjang, bisa lebih panjang daripada tinggi tubuhnya',
      'Sangat cerdas dan dapat menggunakan alat'
    ],
    funFact: 'Salah satu hewan paling pintar di dunia dan nama "orangutan" berarti "orang hutan"!',
    description: 'Orang Utan Kalimantan adalah kera besar yang sangat cerdas dan hanya hidup di hutan Kalimantan. Mereka menghabiskan sebagian besar waktu di atas pohon.'
  },
  {
    id: 'kanguru-pohon',
    localName: 'Kanguru Pohon Papua',
    latinName: 'Dendrolagus ursinus',
    illustration: kanguruPohon,
    habitat: 'Hutan hujan pegunungan Papua dan Papua Nugini',
    foodType: 'Herbivora (daun, pucuk muda, bunga, buah)',
    population: 'Beberapa jenis hanya ratusan ekor',
    conservationStatus: 'Endangered',
    uniqueCharacteristics: [
      'Berbeda dengan kanguru Australia, mereka memanjat pohon',
      'Tubuh berbulu lebat, ekor panjang untuk keseimbangan',
      'Kaki belakang kuat untuk melompat di pohon',
      'Endemik Papua'
    ],
    funFact: 'Satu-satunya kanguru di dunia yang hidup di pohon dan hanya ada di Papua, sering disebut "harta karun Papua"!',
    description: 'Kanguru Pohon Papua adalah marsupial unik yang hidup di atas pohon. Mereka adalah satu-satunya kanguru yang pandai memanjat.'
  },
  {
    id: 'tarsius',
    localName: 'Tarsius Spektral',
    latinName: 'Tarsius tarsier',
    illustration: tarsius,
    habitat: 'Hutan tropis di Sulawesi',
    foodType: 'Karnivora (serangga kecil, kadal, burung kecil)',
    population: 'Menurun karena hutan semakin sempit',
    conservationStatus: 'Vulnerable',
    uniqueCharacteristics: [
      'Mata sangat besar, lebih besar daripada ukuran otaknya',
      'Tubuh kecil, hanya sebesar genggaman tangan',
      'Bisa melompat sangat jauh dibanding ukuran tubuhnya',
      'Kepala bisa berputar hampir 180 derajat'
    ],
    funFact: 'Aktif di malam hari dan suaranya melengking sangat keras untuk ukurannya yang kecil!',
    description: 'Tarsius Spektral adalah primata kecil dengan mata raksasa yang hanya ada di Sulawesi. Mereka adalah pemburu serangga yang aktif di malam hari.'
  }
];