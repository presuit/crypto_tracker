// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    buttonColor: string;
    redColor: string;
    blueColor: string;
    textWrapperColor: string;
    headerBgColor: string;
    accentGray: string;
    accentBlue: string;
  }
}
