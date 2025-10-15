export const registrationDetails = [
  {
    name: "username",
    label: "Username",
    placeholder: "Enter your username",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginDetails = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
      { id: "electronics", label: "Electronics" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
      { id: "jbl", label: "JBL" },
      { id: "hp", label: "HP" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppigHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shopping/home",
  },
  {
    id: "men",
    label: "Men",
    path: "/shopping/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shopping/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shopping/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shopping/listing",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shopping/listing",
  },
  {
    id: "electronics",
    label: "Electronics",
    path: "/shopping/listing",
  },
  {
    id: "allProducts",
    label: "All Products",
    path: "/shopping/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shopping/search",
  },
];

export const shoppingCategoryMenu = [
  {
    id: "home",
    label: "Home",
    path: "/shopping/home",
  },
  {
    id: "nike",
    label: "Nike",
    path: "/shopping/listing",
  },
  {
    id: "adidas",
    label: "Adidas",
    path: "/shopping/listing",
  },
  {
    id: "puma",
    label: "Puma",
    path: "/shopping/listing",
  },
  {
    id: "levi",
    label: "Levi's",
    path: "/shopping/listing",
  },
  {
    id: "zara",
    label: "Zara",
    path: "/shopping/listing",
  },
  {
    id: "h&m",
    label: "H&M",
    path: "/shopping/listing",
  },
  {
    id: "jbl",
    label: "JBL",
    path: "/shopping/listing",
  },
  {
    id: "hp",
    label: "HP",
    path: "/shopping/listing",
  },
  
];

// to get the categoryInUpperCase
export const categoryInUpperCase = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
  electroncis: "Electronics",
};

// to get the brandInUpperCase
export const brandInUpperCase = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  "h&m": "H&M",
  jbl: "JBL",
  hp: "HP",
};

export const FilterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
    { id: "electronics", label: "Electronics" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
    { id: "jbl", label: "JBL" },
    { id: "hp", label: "HP" },
  ],
  price: [
    { id: "1rsto1000rs", label: "500-1000 Rs" },
    { id: "1000rsto2000rs", label: "1000-2000 Rs" },
    { id: "2000rsto3000rs", label: "2000-3000 Rs" },
    { id: "3000rsto4000rs", label: "3000-4000 Rs" },
    { id: "4000rstoInfinity", label: "4000-10000 Rs" },
  ],
};

export const sorting = [
  { id: "price-lowToHigh", label: "Price: Low to High" },
  { id: "price-highToLow", label: "Price: High to Low" },
  { id: "title-a-z", label: "Title: A to Z" },
  { id: "title-z-a", label: "Title: Z to A" },
];



export const addressFormDetails = [
  {
    label: 'Address',
    name: 'address',
    componentType: 'input',
    type: 'text',
    placeholder:'Enter your address'
  },
  {
    label: 'City',
    name: 'city',
    componentType: 'input',
    type: 'text',
    placeholder:'Enter your city'
  },
  {
    label: 'Pincode',
    name: 'pincode',
    componentType: 'input',
    type: 'text',
    placeholder:'Enter your pincode'
  },
  {
    label: 'Phone No',
    name: 'phoneNo',
    componentType: 'input',
    type: 'text',
    placeholder:'Enter your Phone No'
  },
  {
    label: 'Country',
    name: 'country',
    componentType: 'input',
    type: 'text',
    placeholder:'Enter your country'
  },
  {
    label: 'Landmark',
    name: 'landmark',
    componentType: 'input',
    type: 'text',
    placeholder:'Enter your landmark'
  },
]