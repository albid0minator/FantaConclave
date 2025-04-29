import csv
import os

def seleziona_colonne_specifiche(input_csv_file, output_csv_filename="output_colonne_3_4_9.csv", colonna1_index=2, colonna2_index=3, colonna3_index=8):
    """
    Legge un file CSV e ne crea uno nuovo contenente solo le colonne specificate (default: 3, 4 e 9).

    Args:
        input_csv_file (str): Il percorso del file CSV di input.
        output_csv_filename (str, optional): Il nome del file CSV di output da creare.
                                             Default è "output_colonne_3_4_9.csv".
        colonna1_index (int, optional): L'indice (base 0) della prima colonna da esportare.
                                        Default è 2 (corrisponde alla terza colonna).
        colonna2_index (int, optional): L'indice (base 0) della seconda colonna da esportare.
                                        Default è 3 (corrisponde alla quarta colonna).
        colonna3_index (int, optional): L'indice (base 0) della terza colonna da esportare.
                                        Default è 8 (corrisponde alla nona colonna).
    """
    try:
        # Ottieni la cartella del file di input
        input_dir = os.path.dirname(input_csv_file)

        # Costruisci il percorso completo del file di output nella stessa cartella
        output_csv_file = os.path.join(input_dir, output_csv_filename)

        with open(input_csv_file, 'r', newline='', encoding='utf-8') as infile, \
             open(output_csv_file, 'w', newline='', encoding='utf-8') as outfile:
            reader = csv.reader(infile)
            writer = csv.writer(outfile)

            for row in reader:
                if len(row) > max(colonna1_index, colonna2_index, colonna3_index):  # Assicurati che la riga abbia le colonne richieste
                    writer.writerow([row[colonna1_index], row[colonna2_index], row[colonna3_index]])
                elif len(row) > min(colonna1_index, colonna2_index, colonna3_index): # Se ha almeno una delle colonne
                    colonne_da_scrivere = []
                    if len(row) > colonna1_index:
                        colonne_da_scrivere.append(row[colonna1_index])
                    if len(row) > colonna2_index:
                        colonne_da_scrivere.append(row[colonna2_index])
                    if len(row) > colonna3_index:
                        colonne_da_scrivere.append(row[colonna3_index])
                    if colonne_da_scrivere:
                        writer.writerow(colonne_da_scrivere)
                # Le righe che non hanno almeno una delle colonne richieste verranno ignorate

        print(f"File '{output_csv_file}' creato con successo contenente la colonna {colonna1_index + 1}, la colonna {colonna2_index + 1} e la colonna {colonna3_index + 1} di '{input_csv_file}'.")

    except FileNotFoundError:
        print(f"Errore: Il file '{input_csv_file}' non è stato trovato.")
    except Exception as e:
        print(f"Si è verificato un errore: {e}")

if __name__ == "__main__":
    input_file = "Aggiorna.csv"
    seleziona_colonne_specifiche(input_file)