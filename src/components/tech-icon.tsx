import React, { useEffect, useRef } from "react";
import { faAws, faReact, faJs, faDocker, faRaspberryPi, faCss3, faHtml5, faWindows, faLinux } from "@fortawesome/free-brands-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "./tooltip";

export interface TechIconProps {
    icon: string;
    name: string;
}

const TechIcon : React.FC<TechIconProps> = ({name, icon}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    let href = "/assets/logos/ts.svg";
    let component : IconDefinition = faAws;

    switch(icon) {
        case "docker": 
            component = faDocker;
            break;
        case "react":
            component = faReact;
            break;
        case "rpi":
            component = faRaspberryPi;
            break;
        case "css":
            component = faCss3;
            break;
        case "html":
            component = faHtml5;
            break;
        case "csharp":
            component = faWindows;
            break;
        case "windows":
            component = faWindows;
            break;
        case "linux":
            component = faLinux;
    }

    const useSvg = icon === "typescript";

    if(useSvg) {

    }

    useEffect(() => {
        if(svgRef.current) {
            const svgns = "http://www.w3.org/2000/svg";
            const xlinkns = "http://www.w3.org/1999/xlink";
            const use = document.createElementNS(svgns, "use");

            use.setAttributeNS(xlinkns, 'xlink:href', href);
            svgRef.current.appendChild(use);
        }
    }, [svgRef]);



    return (
        <Tooltip text={name}> 
            {useSvg ? (
                <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-react fa-w-16 fa-2x">
                </svg>
            ) : (
                <FontAwesomeIcon icon={component} size="2x" />
            )}
        </Tooltip>
    );
}

export default TechIcon;