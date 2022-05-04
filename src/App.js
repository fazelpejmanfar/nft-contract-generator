/* eslint-disable no-unused-vars */
import './App.css';
import React, { useState } from "react";
import styled from 'styled-components';
import { atomOneDark, atomOneLight, CopyBlock, dracula } from "react-code-blocks";
import code from './code';

const Button = styled.button`
width: 150px;
height: 50px;
color: white;
background-color: red;
border: 2px solid black;
border-radius: 5px;
display: flex;
align-items: center;
align-content: center;
justify-content: center;
align-self: center;
margin-bottom: 20px;
cursor: pointer;
:hover {
color: black;
}
`;

const WLButton = styled.button`
width: 150px;
height: 50px;
color: white;
background-color: green;
border: 2px solid black;
border-radius: 5px;
display: flex;
align-items: center;
align-content: center;
justify-content: center;
align-self: center;
cursor: pointer;
:hover {
color: black;
background-color: aquamarine;
}
`;


const Container = styled.div`
margin: 50px auto auto auto;
width: 50%;
display: flex;
flex-direction: column;
align-content: center;
background-color: transparent;
border: 2px solid black;
box-shadow: 0 0 20px 1px black;
@media (max-width: 600px) {
  width: 70%;
}
`;

const CODEContainer = styled.div`
margin: 50px auto auto auto;
width: 70%;
display: flex;
flex-direction: column;
align-content: center;
background-color: transparent;
border: 2px solid black;
box-shadow: 0 0 20px 1px black;
@media (max-width: 600px) {
  width: 70%;
}
`;

const TextContainer = styled.div`
margin: 50px auto auto auto;
width: 50%;
display: flex;
flex-direction: column;
align-content: center;
background-color: transparent;
border: 2px solid black;
@media (max-width: 600px) {
  width: 70%;
}
`;


const ROWContainer = styled.div`
display: flex;
flex-direction: row;
align-content: center;
align-items: center;
justify-content: center;
gap: 5%;
@media (max-width: 1200px) {
  flex-direction: column;
}
`;

const ROWContainerheader = styled.div`
display: flex;
flex-direction: row;
align-content: center;
align-items: center;
justify-content: center;
gap: 5%;
`;


function App() {

  const [msg, setmsg] = useState(`You can Change this infos after deploy.(expect Name and Symbol)`);
  const [name, setname] = useState('name');
  const [Cname, setCname] = useState('Cname');
  const [symbol, setsymbol] = useState('symbol');
  const [supply, setsupply] = useState(0);
  const [cost, setcost] = useState(0);
  const [maxperwallet, setmaxperwallet] = useState(0);
  const [wlsupply, setwlsupply] = useState(0);
  const [wlcost, setwlcost] = useState(0);
  const [wlmaxperwallet, setwlmaxperwallet] = useState(0);
  const [merkleroot, setmerkleroot] = useState(0);
  const [language, changeLanguage] = useState("jsx");
  const [display, setdisplay] = useState('none');
  const [displaywhitelist, setdisplaywhitelist] = useState('none');
  const [nonwldisplay, setnonwldisplay] = useState('flex');
  const [wldisplay, setwldisplay] = useState('none');


  const Generate = () => {
    if (name === 'name' || Cname === 'Cname' || symbol === 'symbol' || supply === '0' || maxperwallet === '0' || cost === '0') {
      setmsg(`Please Put All The info`)
    } else {
      setdisplay('block');
      setdisplaywhitelist('none')
      setmsg(`Click on Copy icon to Copy your Contract Code`)
    }
  }

  const GenerateWL = () => {
    if (name === 'name' || Cname === 'Cname' || symbol === 'symbol' || supply === '0' || maxperwallet === '0' || cost === '0' || wlsupply === '0' || wlmaxperwallet === '0' || wlcost === '0') {
      setmsg(`Please Put All The info(You can set Merkle Root After Deploy)`)
    } else {
      setdisplay('none');
      setdisplaywhitelist('block')
      setmsg(`Click on Copy icon to Copy your Contract Code`)
    }
  }

  const ShowWL = () => {
    setnonwldisplay('none');
    setwldisplay('flex')
    setdisplay('none');
    setdisplaywhitelist('none');
  };

  const ShowNonwl = () => {
    setnonwldisplay('flex');
    setwldisplay('none')
    setdisplaywhitelist('none');
  };

  let solwhitelist = `
  // SPDX-License-Identifier: GPL-3.0

//Developer : FazelPejmanfar , Twitter :@Pejmanfarfazel



pragma solidity >=0.7.0 <0.9.0;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract ${Cname} is ERC721A, Ownable, ReentrancyGuard {
  using Strings for uint256;

  string public baseURI;
  string public baseExtension = ".json";
  string public notRevealedUri;
  uint256 public cost = ${cost} ether;
  uint256 public wlcost = ${wlcost} ether;
  uint256 public maxSupply = ${supply};
  uint256 public WlSupply = ${wlsupply};
  uint256 public MaxperWallet = ${maxperwallet};
  uint256 public MaxperWalletWl = ${wlmaxperwallet};
  bool public paused = false;
  bool public revealed = false;
  bool public preSale = true;
  bool public publicSale = false;
  bytes32 public merkleRoot = ${merkleroot};

  constructor(
    string memory _initBaseURI,
    string memory _initNotRevealedUri
  ) ERC721A("${name}", "${symbol}") {
    setBaseURI(_initBaseURI);
    setNotRevealedURI(_initNotRevealedUri);
  }

  // internal
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }
      function _startTokenId() internal view virtual override returns (uint256) {
        return 1;
    }

  // public
  function mint(uint256 tokens) public payable nonReentrant {
    require(!paused, "${symbol}: oops contract is paused");
    require(publicSale, "${symbol}: Sale Hasn't started yet");
    uint256 supply = totalSupply();
    require(tokens > 0, "${symbol}: need to mint at least 1 NFT");
    require(tokens <= MaxperWallet, "${symbol}: max mint amount per tx exceeded");
    require(supply + tokens <= maxSupply, "${symbol}: We Soldout");
    require(_numberMinted(_msgSender()) + tokens <= MaxperWallet, "${symbol}: Max NFT Per Wallet exceeded");
    require(msg.value >= cost * tokens, "${symbol}: insufficient funds");

      _safeMint(_msgSender(), tokens);
    
  }
/// @dev presale mint for whitelisted
    function presalemint(uint256 tokens, bytes32[] calldata merkleProof) public payable nonReentrant {
    require(!paused, "${symbol}: oops contract is paused");
    require(preSale, "${symbol}: Presale Hasn't started yet");
    require(MerkleProof.verify(merkleProof, merkleRoot, keccak256(abi.encodePacked(msg.sender))), "${symbol}: You are not Whitelisted");
    uint256 supply = totalSupply();
    require(_numberMinted(_msgSender()) + tokens <= MaxperWalletWl, "${symbol}: Max NFT Per Wallet exceeded");
    require(tokens > 0, "${symbol}: need to mint at least 1 NFT");
    require(tokens <= MaxperWalletWl, "${symbol}: max mint per Tx exceeded");
    require(supply + tokens <= WlSupply, "${symbol}: Whitelist MaxSupply exceeded");
    require(msg.value >= wlcost * tokens, "${symbol}: insufficient funds");

      _safeMint(_msgSender(), tokens);
    
  }




  /// @dev use it for giveaway and mint for yourself
     function gift(uint256 _mintAmount, address destination) public onlyOwner nonReentrant {
    require(_mintAmount > 0, "need to mint at least 1 NFT");
    uint256 supply = totalSupply();
    require(supply + _mintAmount <= maxSupply, "max NFT limit exceeded");

      _safeMint(destination, _mintAmount);
    
  }

  


  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721AMetadata: URI query for nonexistent token"
    );
    
    if(revealed == false) {
        return notRevealedUri;
    }

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
        : "";
  }

    function numberMinted(address owner) public view returns (uint256) {
    return _numberMinted(owner);
  }

  //only owner
  function reveal(bool _state) public onlyOwner {
      revealed = _state;
  }

  function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }
  
  function setMaxPerWallet(uint256 _limit) public onlyOwner {
    MaxperWallet = _limit;
  }

    function setWlMaxPerWallet(uint256 _limit) public onlyOwner {
    MaxperWalletWl = _limit;
  }
  
  function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
  }

    function setWlCost(uint256 _newWlCost) public onlyOwner {
    wlcost = _newWlCost;
  }

    function setMaxsupply(uint256 _newsupply) public onlyOwner {
    maxSupply = _newsupply;
  }

    function setwlsupply(uint256 _newsupply) public onlyOwner {
    WlSupply = _newsupply;
  }

  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
    baseExtension = _newBaseExtension;
  }
  
  function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
    notRevealedUri = _notRevealedURI;
  }

  function pause(bool _state) public onlyOwner {
    paused = _state;
  }

    function togglepreSale(bool _state) external onlyOwner {
        preSale = _state;
    }

    function togglepublicSale(bool _state) external onlyOwner {
        publicSale = _state;
    }
  
 
  function withdraw() public payable onlyOwner nonReentrant {
    (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
    require(success);
  }
}

  
  `;


  let sol = `

// SPDX-License-Identifier: GPL-3.0

//Developer : FazelPejmanfar , Twitter :@Pejmanfarfazel



pragma solidity >=0.7.0 <0.9.0;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ${Cname} is ERC721A, Ownable, ReentrancyGuard {
  using Strings for uint256;

  string public baseURI;
  string public baseExtension = ".json";
  string public notRevealedUri;
  uint256 public cost = ${cost} ether;
  uint256 public maxSupply = ${supply};
  uint256 public MaxperWallet = ${maxperwallet};
  bool public paused = false;
  bool public revealed = false;
  constructor(
    string memory _initBaseURI,
    string memory _initNotRevealedUri
  ) ERC721A("${name}", "${symbol}") {
    setBaseURI(_initBaseURI);
    setNotRevealedURI(_initNotRevealedUri);
  }

  // internal
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }
      function _startTokenId() internal view virtual override returns (uint256) {
        return 1;
    }

  // public
  function mint(uint256 tokens) public payable nonReentrant {
    require(!paused, "${symbol}: oops contract is paused");
    uint256 supply = totalSupply();
    require(tokens > 0, "${symbol}: need to mint at least 1 NFT");
    require(tokens <= MaxperWallet, "${symbol}: max mint amount per tx exceeded");
    require(supply + tokens <= maxSupply, "${symbol}: We Soldout");
    require(_numberMinted(_msgSender()) + tokens <= MaxperWallet, "${symbol}: Max NFT Per Wallet exceeded");
    require(msg.value >= cost * tokens, "${symbol}: insufficient funds");

      _safeMint(_msgSender(), tokens);
    
  }


  /// @dev use it for giveaway and mint for yourself
     function gift(uint256 _mintAmount, address destination) public onlyOwner nonReentrant {
    require(_mintAmount > 0, "need to mint at least 1 NFT");
    uint256 supply = totalSupply();
    require(supply + _mintAmount <= maxSupply, "max NFT limit exceeded");

      _safeMint(destination, _mintAmount);
    
  }

  


  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721AMetadata: URI query for nonexistent token"
    );
    
    if(revealed == false) {
        return notRevealedUri;
    }

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
        : "";
  }

    function numberMinted(address owner) public view returns (uint256) {
    return _numberMinted(owner);
  }

  //only owner
  function reveal(bool _state) public onlyOwner {
      revealed = _state;
  }
  
  function setMaxPerWallet(uint256 _limit) public onlyOwner {
    MaxperWallet = _limit;
  }
  
  function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
  }
    function setMaxsupply(uint256 _newsupply) public onlyOwner {
    maxSupply = _newsupply;
  }

  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
    baseExtension = _newBaseExtension;
  }
  
  function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
    notRevealedUri = _notRevealedURI;
  }

  function pause(bool _state) public onlyOwner {
    paused = _state;
  }
 
  function withdraw() public payable onlyOwner nonReentrant {
    (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
    require(success);
  }
}

    
    `;




  return (
    <div className="App">
      <header className="App-header">
        <ROWContainerheader>
        <WLButton style={{backgroundColor: 'red', fontWeight: 'bolder'}}
                 onClick={(e) => {
                  e.preventDefault();
                  ShowWL();
                }}
        >
         With Whitelist
        </WLButton>
        <WLButton style={{backgroundColor: 'red', fontWeight: 'bolder'}}
                 onClick={(e) => {
                  e.preventDefault();
                  ShowNonwl();
                }}        
        >
         Without Whitelist
        </WLButton>
        </ROWContainerheader>
      </header>
      <TextContainer style={{display: nonwldisplay}}>
        <p style={{fontWeight: 'bold'}}>
         Gas Effiecnt ERC721A Contract With ReentrancyGuard <br></br> Gift function (to mint for free to addresses)
        </p>
      </TextContainer>
      <TextContainer style={{display: wldisplay}}>
        <p style={{fontWeight: 'bold'}}>
         Gas Effiecnt ERC721A Contract With ReentrancyGuard and MerkleTree Whitelist <br></br> Gift function (to mint for free to addresses)
        </p>
      </TextContainer>
      <Container style={{display: nonwldisplay}}>
        <h3 style={{fontWeight: 'bolder', color: "white"}}>
          ERC721A Without Whitelist
        </h3>
        <ROWContainer>
        <div>
          <h5>
          Collection Name
          </h5>
          <input name='Name' type={"text"}  placeholder='e.g Sketchy Apes'  onChange={ e => setname(e.target.value)}/>
        </div>
        <div>
        <h5>
        Collection Symbol
          </h5>
          <input name='Symbol' type={"text"} placeholder='e.g SABC' onChange={ e => setsymbol(e.target.value)} />
        </div>
        <div>
        <h5>
        Contract Name <span style={{color: "white", fontSize: 10}}>(Without Spaces)</span>
          </h5>
          <input name='Contract Name' type={"name"} placeholder='e.g SketchyApes' onChange={ e => setCname(e.target.value)} />
        </div>
        </ROWContainer>
        <ROWContainer>
        <div>
        <h5>
        Collection MaxSupply
          </h5>
          <input name='Supply' type={"number"} placeholder='e.g 5000' onChange={ e => setsupply(e.target.value)} />
        </div>
        <div>
        <h5>
          Max Per Wallet
          </h5>
          <input name='Supply' type={"number"} placeholder='e.g 5' onChange={ e => setmaxperwallet(e.target.value)} />
        </div>
        </ROWContainer>
        <div>
        <h5>
        Price 
          </h5>
          <input name='Price' type={"number"} placeholder='e.g 0.05' onChange={ e => setcost(e.target.value)} />
        </div>
        <p style={{fontWeight: 'bolder', color: 'red', textShadow: "3px 3px 5px black"}}>
        {msg}
      </p>
        <Button
         onClick={(e) => {
           e.preventDefault();
           Generate();
         }}
         style={{fontWeight: 'bold'}}
        >
        Generate
      </Button>
      </Container>



      <Container style={{display: wldisplay}}>
        <h3 style={{fontWeight: 'bolder', color: "white"}}>
          ERC721A With MerkleTree Whitelist
        </h3>
        <ROWContainer>
        <div>
          <h5>
          Collection Name
          </h5>
          <input name='Name' type={"text"}  placeholder='e.g Sketchy Apes'  onChange={ e => setname(e.target.value)}/>
        </div>
        <div>
        <h5>
        Collection Symbol
          </h5>
          <input name='Symbol' type={"text"} placeholder='e.g SABC' onChange={ e => setsymbol(e.target.value)} />
        </div>
        <div>
        <h5>
        Contract Name <span style={{color: "white", fontSize: 10}}>(Without Spaces)</span>
          </h5>
          <input name='Contract Name' type={"name"} placeholder='e.g SketchyApes' onChange={ e => setCname(e.target.value)} />
        </div>
        </ROWContainer>
        <ROWContainer>
        <div>
        <h5>
        Collection MaxSupply
          </h5>
          <input name='Supply' type={"number"} placeholder='e.g 5000' onChange={ e => setsupply(e.target.value)} />
        </div>
        <div>
        <h5>
        Whitelist Supply
          </h5>
          <input name='Supply' type={"number"} placeholder='e.g 2000' onChange={ e => setwlsupply(e.target.value)} />
        </div>
        </ROWContainer>
        <ROWContainer>
        <div>
        <h5>
          Max Per Wallet
          </h5>
          <input name='Supply' type={"number"} placeholder='e.g 5' onChange={ e => setmaxperwallet(e.target.value)} />
        </div>
        <div>
        <h5>
         Whitelit Max Per Wallet
          </h5>
          <input name='Supply' type={"number"} placeholder='e.g 2' onChange={ e => setwlmaxperwallet(e.target.value)} />
        </div>
        </ROWContainer>
        <ROWContainer>
        <div>
        <h5>
        Price 
          </h5>
          <input name='Price' type={"number"} placeholder='e.g 0.05' onChange={ e => setcost(e.target.value)} />
        </div>
        <div>
        <h5>
        Whitelist Price 
          </h5>
          <input name='Price' type={"number"} placeholder='e.g 0.03' onChange={ e => setwlcost(e.target.value)} />
        </div>
        </ROWContainer>
        <div>
        <h5>
        Merkle Root
          </h5>
          <input name='merkleroot' type={"text"} placeholder='e.g 0x13asd8784asd123as' onChange={ e => setmerkleroot(e.target.value)} />
        </div>
        <p style={{fontWeight: 'bolder', color: 'red', textShadow: "3px 3px 5px black"}}>
        {msg}
      </p>
        <Button
         onClick={(e) => {
           e.preventDefault();
           GenerateWL();
         }}
         style={{fontWeight: 'bold'}}
        >
        Generate
      </Button>
      </Container>




      <CODEContainer style={{display: display, textAlign: 'left'}}>
      <CopyBlock
      text={sol}
      language={'sol'}
      showLineNumbers={false}
      theme={atomOneLight}
    />
      </CODEContainer>

      <CODEContainer style={{display: displaywhitelist, textAlign: 'left'}}>
      <CopyBlock
      text={solwhitelist}
      language={'sol'}
      showLineNumbers={false}
      theme={atomOneLight}
    />
      </CODEContainer>
    </div>
  );
}

export default App;
