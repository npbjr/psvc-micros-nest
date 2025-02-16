import json
from datetime import datetime

def generate_insert_queries(data):
    values = []
    for entry in data:
        game_type_id_query = "(SELECT id FROM game_type WHERE name = '{}')".format(entry["game"])
        combinations = entry["combinations"]
        draw_date = datetime.strptime(entry["drawDate"], "%m/%d/%Y").strftime("%Y-%m-%d")
        jackpot = entry["jackpot"]
        winners = entry["winners"]
        
        value = f"({game_type_id_query}, '{combinations}', '{draw_date}', {jackpot}, {winners})"
        values.append(value)
    
    # Join all values into a single string
    values_string = ",\n            ".join(values)
    insert_query = f"INSERT INTO lotto_result (\"gameTypeId\", combinations, \"drawDate\", jackpot, winners) VALUES \n            {values_string};"
    
    return insert_query

def main(input_file, output_file):
    # Load data from JSON file
    with open(input_file, 'r') as f:
        lotto_data = json.load(f)

    # Generate SQL insert query
    insert_query = generate_insert_queries(lotto_data)

    # Write query to output file
    with open(output_file, 'w') as f:
        f.write(insert_query + "\n")

if __name__ == "__main__":
    input_file = 'lotto_data.json'  # Input JSON file
    output_file = 'insert_queries.sql'  # Output SQL file
    main(input_file, output_file)

    print(f"SQL insert query has been generated and saved to {output_file}.")
