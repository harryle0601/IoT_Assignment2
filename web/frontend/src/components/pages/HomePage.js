import React,{Component} from "react";
import ParallaxCarousel from "../layout/ParallaxCarousel";
import ProductValues from "../layout/ProductValue";
import ProductCategories from "../layout/ProductCategories";
import ProductHowItWorks from "../layout/ProductHowItWorks";
export class HomePage extends Component{
    render() {
        console.log("this is new new new")
        return(<div>
            <ParallaxCarousel maxWidth='sm'/>
            <ProductValues/>
            <ProductCategories/>
            <ProductHowItWorks/>
        </div>
        )
    }
}
