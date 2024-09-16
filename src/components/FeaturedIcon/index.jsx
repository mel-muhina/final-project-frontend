import { useEffect } from 'react'
import deer from '../../assets/images/deer.png'
import tree from '../../assets/images/tree.png'
import trail from '../../assets/images/trail.png'
import mountain from '../../assets/images/mountain.png'
import { useFeaturedCardIcon } from '../../contexts'
import './FeaturedIcon.css'

export default function FeaturedIcon({ tag }) {
    const { FeaturedCardIconData, setFeaturedCardIconData } = useFeaturedCardIcon();

    useEffect(() => {
        // console.log("FeaturedIcon UseEffect Tag Check", tag)
        getIcons(tag);
    }, [tag])

    const icons = [
        {name: "park", "icon": deer},
        {name: "mountain", "icon": mountain},
        {name: "trail", "icon": trail},
        {name: "woodlands", "icon": tree},
        {name: "openspaces", "icon": tree},
        {name: "rivers", "icon": tree},
        {name: "beaches", "icon": tree},
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
