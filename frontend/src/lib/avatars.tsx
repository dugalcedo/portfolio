import { 
    GiDeerHead,
    GiRabbitHead,
    GiBirdTwitter,
    GiGorilla,
    GiLion,
    GiTigerHead,
    GiGoat,
    GiSheep,
    GiSharkJaws,
    GiBearFace,
    GiPolarBear,
    GiFox,
    GiJugglingSeal,
    GiParrotHead,
    GiVulture,
    GiPenguin,
    GiEagleHead,
    GiPig,
    GiPigFace,
    GiElephantHead,
    GiRhinocerosHorn,
    GiRat, 
    GiRaccoonHead,
    GiKangaroo,
    GiKoala,
    GiDolphin,
    GiOrcHead,
    GiUnicorn
} from "react-icons/gi";
import { 
    PiDogFill,
    PiCatFill 
} from "react-icons/pi";
import { 
    FaFish,
    FaHorseHead,
    FaDragon,
    FaHippo
} from "react-icons/fa6";
import { 
    SiFoodpanda 
} from "react-icons/si";

import { Animal } from './types.ts'

const avatars: Record<Animal, JSX.Element> = {
    'deer': <GiDeerHead size="48px" />,
    'dog': <PiDogFill size="48px" />,
    'rabbit': <GiRabbitHead size="48px" />,
    'cat': <PiCatFill size="48px" />,
    'bird': <GiBirdTwitter size="48px" />,
    'gorilla': <GiGorilla size="48px" />,
    'fish': <FaFish size="48px" />,
    'lion': <GiLion size="48px" />,
    'tiger': <GiTigerHead size="48px" />,
    'horse': <FaHorseHead size="48px" />,
    'dragon': <FaDragon size="48px" />,
    'goat': <GiGoat size="48px" />,
    'sheep': <GiSheep size="48px" />,
    'shark': <GiSharkJaws size="48px" />,
    'bear': <GiBearFace size="48px" />,
    'polarbear': <GiPolarBear size="48px" />,
    'fox': <GiFox size="48px" />,
    'seal': <GiJugglingSeal size="48px" />,
    'parrot': <GiParrotHead size="48px" />,
    'vulture': <GiVulture size="48px" />,
    'penguin': <GiPenguin size="48px" />,
    'eagle': <GiEagleHead size="48px" />,
    'pig': <GiPig size="48px" />,
    'ape': <GiPigFace size="48px" />,
    'elephant': <GiElephantHead size="48px" />,
    'hippo': <FaHippo size="48px" />,
    'rhino': <GiRhinocerosHorn size="48px" />,
    'panda': <SiFoodpanda size="48px" />,
    'rat': <GiRat size="48px" />,
    'raccoon': <GiRaccoonHead size="48px" />,
    'kangaroo': <GiKangaroo size="48px" />,
    'koala': <GiKoala size="48px" />,
    'dolphin': <GiDolphin size="48px" />,
    'orc': <GiOrcHead size="48px" />,
    'unicorn': <GiUnicorn size="48px" />,
}

export default avatars
