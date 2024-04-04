interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  dob: {
    date: string;
    age: number;
  };
  age: number;
  gender: string;
  email: string;
  location: {
    city: string;
    country: string;
    postcode: number;
    state: string;
    street :{
      number : number
      name : string
    }
  };
  nat: string;
  picture: {
    large: string
    medium : string
    thumbnail : string
  };
  phone: number;
}

export default User;
