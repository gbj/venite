import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "fragment",
})
export class FragmentPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value.replace("#", "");
  }
}
