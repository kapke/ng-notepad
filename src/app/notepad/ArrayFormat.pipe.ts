import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'arrayFormat',
})
export class ArrayFormatPipe implements PipeTransform {
    transform(value: any): string {
        if (typeof value.join === 'function') {
            return value.join(', ')
        } else {
            return value
        }
    }
}
