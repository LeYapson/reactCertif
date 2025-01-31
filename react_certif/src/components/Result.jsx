function Result({ character }) {
    return (
      <div>
        <h2>Tu es {character.name} !</h2>
        <img src={character.image} alt={character.name} />
        <p>{character.description}</p>
      </div>
    );
  }
  
  export default Result;
  