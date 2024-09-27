import { useEffect } from 'react'
import deer from '../../assets/images/deer.png'
import deer2 from '../../assets/images/deer2.png'
import tree from '../../assets/images/tree.png'
import tree1 from '../../assets/images/tree1.png'
import redtree from '../../assets/images/redtree.png'
import sakuratree from '../../assets/images/sakuratree.png'
import oaktree from '../../assets/images/oaktree.png'
import trail from '../../assets/images/trail.png'
import mountain from '../../assets/images/mountain.png'
import garden from '../../assets/images/garden.png'
import farm from '../../assets/images/farm.png'
import farmb from '../../assets/images/farmb.png'
import historic from '../../assets/images/historic.png'
import camping from '../../assets/images/camping.png'
import camping2 from '../../assets/images/camping2.png'
import path from '../../assets/images/path.png'
import riverd from '../../assets/images/riverd.png'
import shell from '../../assets/images/shell.png'
import { useFeaturedCardIcon } from '../../contexts'
import './FeaturedIcon.css'

export default function FeaturedIcon({ tag }) {
    const { FeaturedCardIconData, setFeaturedCardIconData } = useFeaturedCardIcon();

    useEffect(() => {
        // console.log("FeaturedIcon UseEffect Tag Check", tag)
        getIcons(tag);
    }, [tag])

    const icons = [
        {name: "Park", "icon": sakuratree},
        {name: "Hiking", "icon": path},
        {name: "Camping", "icon": camping2},
        {name: "Woodlands", "icon": oaktree},
        {name: "Garden", "icon": garden},
        {name: "Rivers", "icon": riverd},
        {name: "Beach", "icon": shell},
        {name: "Wildlife", "icon": deer},
        {name: "Farm", "icon": farm},
        {name: "Historic", "icon": historic},

    ]


    async function getIcons(tag) {
        const result = icons.find(icon => icon.name === tag)
        if (result) {
            setFeaturedCardIconData(result.icon) 
        } else {
            // console.log("Icon not found, setting default")
            setFeaturedCardIconData(deer) 
        }
    }

  return (

    <>
       <img src={FeaturedCardIconData ? FeaturedCardIconData : deer} className="FeaturedIcon-Img"/>
    </>
  
  )
}
