/*
  TEAM DATA
  ---------
  Edit this file to add, remove, or update leadership profiles.

  Tips:
  - Leave photo: "" to show initials automatically.
  - Add a photo to /assets/img/team/ and use a path such as:
      photo: "/assets/img/team/jane-smith.jpg"
  - Leave links: [] if a person has no profile links.
  - You can add more links by copying a { label, url } line.
*/

window.LAGOON_TEAM = {
  generalLeadership: [
    {
      name: "Shriya Varada",
      role: "Co-President",
      bio: "Shriya helps guide organization-wide planning and keeps student outreach organized across projects.",
      photo: "",
      links: []
    },
    {
      name: "Eshan Vipuil",
      role: "Co-President",
      bio: "Eshan helps direct project development, research-backed outreach, and organization-wide documentation. He is also a senior at West Shore and stays involved in biomedical engineering research and math circle community service outreach.",
      photo: "/assets/img/team/eshan-vipuil.jpg",
      links: [
        { label: "LinkedIn", url: "https://www.linkedin.com/in/eshan-vipuil-8042952a3" }
      ]
    },
    {
      name: "Joseph Konathapally",
      role: "Treasurer",
      bio: "Joseph manages budget planning, supply tracking, and financial records for The Lagoon Legacy Project.",
      photo: "",
      links: []
    },
    {
      name: "Raaha Sellamuthu",
      role: "Secretary",
      bio: "Raaha organizes meeting notes, project communication, and outreach records so organization-wide work stays easy to follow.",
      photo: "",
      links: [
        { label: "LinkedIn", url: "https://www.linkedin.com/in/raaha-sellamuthu" }
      ]
    },
    {
      name: "Zachary De Witt",
      role: "Lead Web Developer",
      bio: "Zachary develops and maintains the project website and digital infrastructure, supporting public resources, chapter communication, and project documentation.",
      photo: "/assets/img/team/zachary-de-witt.jpg",
      links: [
        { label: "LinkedIn", url: "https://www.linkedin.com/in/zachary-de-witt-a72450419/" }
      ]
    }
  ],

  chapters: [
    {
      id: "brevard",
      name: "Brevard County",
      label: "Brevard County Chapter",
      status: "Active",
      officers: [
        {
          name: "Faizan Ahmed",
          role: "President",
          bio: "Faizan coordinates Brevard chapter activity and local outreach for The Lagoon Legacy Project.",
          photo: "",
          links: [
            { label: "LinkedIn", url: "https://www.linkedin.com/in/thefaizanak/" }
          ]
        },
        {
          name: "Sankeerth Kesireddy",
          role: "Vice-President",
          bio: "Sankeerth helps with chapter coordination, outreach planning, and day-to-day project logistics.",
          photo: "",
          links: [
            { label: "LinkedIn", url: "https://www.linkedin.com/in/sankeerth-kesireddy-226b07376" }
          ]
        }
      ]
    },
    {
      id: "martin",
      name: "Martin County",
      label: "Martin County Chapter",
      status: "Forming",
      officers: [
        {
          name: "Zachary De Witt",
          role: "President",
          bio: "Zachary leads the Martin County chapter and is building its local outreach, partnerships, and first chapter projects.",
          photo: "",
          links: [
            { label: "LinkedIn", url: "https://www.linkedin.com/in/zachary-de-witt-a72450419/" }
          ]
        }
      ]
    }
  ]
};
