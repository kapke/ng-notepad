import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'arrayFormat',
})
export class ArrayFormatPipe implements PipeTransform {
    transform(value: { join(separator: string): string }): string
    transform<T>(value: T): T
    transform(value: any): any {
        if (value && typeof value.join === 'function') {
            return value.join(', ')
        } else {
            return value
        }
    }
}
