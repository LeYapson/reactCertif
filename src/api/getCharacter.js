import axios from "axios";

const characters = [
  {
    name: "Jinx",
    description: "Un esprit chaotique et imprévisible. Si tu es fun et imprévisible, Jinx est ton âme sœur !",
    tags: ["chaotique", "énergique", "rebelle"]
  },
  {
    name: "Thresh",
    description: "Manipulateur et rusé, Thresh aime contrôler et tourmenter ses adversaires.",
    tags: ["manipulateur", "calculateur", "stratège"]
  },
  {
    name: "Ahri",
    description: "Séduisante et malicieuse, Ahri sait comment charmer et influencer son entourage.",
    tags: ["charmeur", "intelligent", "tactique"]
  },
  {
    name: "Leona",
    description: "Un bouclier vivant qui protège son équipe et prend les coups.",
    tags: ["protecteur", "stratégique"]
  },
  {
    name: "Zed",
    description: "Un ninja de l'ombre, calculateur et impitoyable.",
    tags: ["calculateur", "dominant", "stratégique"]
  },
  {
    name: "Rengar",
    description: "Un prédateur féroce qui traque et élimine ses cibles sans pitié.",
    tags: ["rebelle", "dominant", "chaotique"]
  }
];

async function getCharacter(answers) {
  const score = {};

  answers.forEach(answer => {
    characters.forEach(character => {
      if (character.tags.includes(answer)) {
        score[character.name] = (score[character.name] || 0) + 1;
      }
    });
  });

  const bestMatch = Object.keys(score).reduce((a, b) => (score[a] > score[b] ? a : b), characters[0].name);
  const matchedCharacter = characters.find(character => character.name === bestMatch);

  try {
    const response = await axios.get("https://ddragon.leagueoflegends.com/cdn/13.1.1/data/en_US/champion.json");
    const championsData = response.data.data;
    
    const championKey = Object.keys(championsData).find(
      key => championsData[key].name.toLowerCase() === matchedCharacter.name.toLowerCase()
    );
    
    if (championKey) {
      const imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championKey}_0.jpg`;
      return { ...matchedCharacter, image: imageUrl };
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'image :", error);
  }
  
  return { ...matchedCharacter, image: "https://example.com/default.jpg" };
}

export default getCharacter;
