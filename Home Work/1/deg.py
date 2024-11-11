def cel_to_frh(cel):
    frh = (cel * 1.8) + 32
    # The Celsius scale is based on the freezing point of water 
    # (0°C) and the boiling point of water (100°C).


    # The Fahrenheit scale sets the freezing point of water at 
    # 32°F and the boiling point at 212°F.
    return frh

    cel = float(input("👾 Please enter the temperature in Celsius : "))
    frh = cel_to_frh(cel)
    print("temperature{frh}")

