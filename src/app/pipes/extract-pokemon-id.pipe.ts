import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractPokemonId',
  standalone: true,
})
export class ExtractPokemonIdPipe implements PipeTransform {
  transform(value: string): string {
    const match = value.match(/(\d+)\/$/);
    return match ? match[1] : '';
  }
}
