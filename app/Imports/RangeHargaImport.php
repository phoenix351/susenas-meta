<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class RangeHargaImport implements ToCollection
{
    /**
     * @param Collection $collection
     */
    public $rows;
    public function collection(Collection $collection)
    {
        $this->rows = $collection;
    }
}
