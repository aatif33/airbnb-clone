import Exp from "../images/Exp.png"
import ch from "../images/Charlie.png"
import pr from "../images/paraly.png"
import jj from "../images/Jo.png"
import ol from "../images/olymp.png"
import stt from "../images/street.png"
import ng from "../images/night.png"
import bot from "../images/Botanical.png"
export const experiences = {
  originals: [
    {
      id: 1,
      title: "Intimate dinner party with Chef Charlie Mitchell",
      location: "New York, United States",
      price: 3588,
      image: ch,
      availability: [
    {
      date: "2026-02-11",
      slots: [ { time: "2:30 PM – 5:00 PM", capacity: 8 },{ time: "9:30 AM – 12:00 PM", capacity: 10}]
    },
    {
      date: "2026-02-12",
      slots:[ { time: "2:30 PM – 5:00 PM", capacity: 8 },{ time: "9:30 AM – 12:00 PM", capacity: 10}]
    },
    {
      date: "2026-02-13",
      slots: [ { time: "2:30 PM – 5:00 PM", capacity: 8 },{ time: "9:30 AM – 12:00 PM", capacity: 10}]
    }
  ]
    },
    {
      id: 2,
      title: "Hero mindset with Paralympian Francesca Porcellato",
      location: "Milan, Italy",
      price: 2999,
      image: pr,
      availability: [
    {
      date: "2026-02-11",
      slots:[ { time: "8:30 AM – 11:00 AM", capacity: 8 },{ time: "1.00 PM – 4.00PM", capacity: 10}]
    },
    {
      date: "2026-02-12",
      slots:[ { time: "8:30 AM – 11:00 AM", capacity: 8 },{ time: "1.00 PM – 4.00PM", capacity: 10}]
    },
    {
      date: "2026-02-13",
      slots:[ { time: "8:30 AM – 11:00 AM", capacity: 8 },{ time: "1.00 PM – 4.00PM", capacity: 10}]
    }
  ]
    },
    {
      id: 3,
      title: "Join OAFF & Savera's entourage at Lolla India",
      location: "New York, United States",
      price: 5850,
      image: jj,
      availability: [
    {
      date: "2026-02-11",
      slots:[ { time: "8:30 AM – 11:00 AM", capacity: 8 },{ time: "1.00 PM – 4.00PM", capacity: 10}]
    },
    {
      date: "2026-02-12",
      slots: [ { time: "8:30 AM – 11:00 AM", capacity: 8 },{ time: "1.00 PM – 4.00PM", capacity: 10}]
    },
    {
      date: "2026-02-13",
      slots: [ { time: "8:30 AM – 11:00 AM", capacity: 8 },{ time: "1.00 PM – 4.00PM", capacity: 10}]
    }
  ]
    },
    {
      id: 4,
      title: "Recover like an Olympian with Neville Wright",
      location: "Milan, Italy",
      price: 2729,
      image: ol,
      availability: [
    {
      date: "2026-02-11",
      slots: [ { time: "8:30 AM – 11:00 AM", capacity: 8 },{ time: "1.00 PM – 4.00PM", capacity: 10}]
    },
    {
      date: "2026-02-12",
      slots:[ { time: "8:30 AM – 11:00 AM", capacity: 8 },{ time: "1.00 PM – 4.00PM", capacity: 10}]
    },
    {
      date: "2026-02-13",
      slots: [ { time: "8:30 AM – 11:00 AM", capacity: 8 },{ time: "1.00 PM – 4.00PM", capacity: 10}]
    }
  ]
    },
  ],

  local: [
    {
      id: 5,
      title: "Explore Halasuru's cultural sites",
      location: "Bengaluru, India",
      price: 1999,
      image: Exp,
      availability: [
    {
      date: "2026-02-11",
      slots: [ { time: "8:30 AM – 11:00 AM", capacity: 8 },{ time: "1.00 PM – 4.00PM", capacity: 10}]
    },
    {
      date: "2026-02-12",
      slots: [ { time: "8:30 AM – 11:00 AM", capacity: 8 },{ time: "1.00 PM – 4.00PM", capacity: 10}]
    },
    {
      date: "2026-02-13",
      slots: [ { time: "8:30 AM – 11:00 AM", capacity: 8 },{ time: "1.00 PM – 4.00PM", capacity: 10}]
    }
  ]
    },
    {id: 6,
      title: "City history & arcjitecture walk",
      location: "Bengaluru, India",
      price: 3999,
      image: stt,
      availability: [
    {
      date: "2026-02-11",
      slots: [ { time: "8:30 AM – 11:00 AM", capacity: 8 },{ time: "1.00 PM – 4.00PM", capacity: 10}]
    },
    {
      date: "2026-02-12",
      slots:[ { time: "8:30 AM – 11:00 AM", capacity: 8 },{ time: "1.00 PM – 4.00PM", capacity: 10}]
    },
    {
      date: "2026-02-13",
      slots: [ { time: "8:30 AM – 11:00 AM", capacity: 8 },{ time: "1.00 PM – 4.00PM", capacity: 10}]
    }
  ]

    },
    {id: 7,
      title: "Street Food Tour near a Locala Market in Bangalore",
      location: "Bengaluru, India",
      price: 3339,
      image: ng,
      availability: [
    {
      date: "2026-02-11",
      slots: [ { time: "8:30 AM – 11:00 AM", capacity: 8 },{ time: "1.00 PM – 4.00PM", capacity: 10}]
    },
    {
      date: "2026-02-12",
      slots:[ { time: "8:30 AM – 11:00 AM", capacity: 8 },{ time: "1.00 PM – 4.00PM", capacity: 10}]
    },
    {
      date: "2026-02-13",
      slots: [ { time: "8:30 AM – 11:00 AM", capacity: 8 },{ time: "1.00 PM – 4.00PM", capacity: 10}]
    }
  ]
    },
    {id: 8,
      title: "See exotic trees in the Lalbagh Botanical Gardern",
      location: "Bengaluru, India",
      price: 1000,
      image: bot,
      availability: [
    {
      date: "2026-02-11",
      slots: [ { time: "8:30 AM – 11:00 AM", capacity: 8 },{ time: "1.00 PM – 4.00PM", capacity: 10}]
    },
    {
      date: "2026-02-12",
      slots: [ { time: "8:30 AM – 11:00 AM", capacity: 8 },{ time: "1.00 PM – 4.00PM", capacity: 10}]
    },
    {
      date: "2026-02-13",
      slots: [ { time: "8:30 AM – 11:00 AM", capacity: 8 },{ time: "1.00 PM – 4.00PM", capacity: 10}]
    }
  ]

    }
  ],
};
