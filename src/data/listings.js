import beach from "../images/Beach.jpg";
import cabin from "../images/cabin.jpg";
import mount from "../images/Mountain.jpg";

export const listings = [
  {
    id: 1,
    title: "Beach House",
    location: "Goa, India",
    price: 3500,
    rating: 4.8,
    reviews: 124,
    host: "Rahul",
    image: beach,
    amenities: ["Wifi", "Kitchen", "Sea View", "Free Parking"],
  },
  {
    id: 2,
    title: "Mountain Cabin",
    location: "Manali, India",
    price: 4200,
    rating: 4.9,
    reviews: 98,
    host: "Ananya",
    image: cabin,
    amenities: ["Wifi", "Fireplace", "Mountain View", "Heating"],
  },
  {
    id: 3,
    title:"Netherland view",
    location: "Grevink reizen",
    price: 5200,
    rating: 4.8,
    reviews: 129,
    host: "Patrick",
    image: mount,
    amenities: ["Wifi", "Snowplace", "Crazy View", "Chill"],
  },
];


