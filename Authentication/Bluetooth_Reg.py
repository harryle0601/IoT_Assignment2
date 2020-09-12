import bluetooth
import sys

def bluetooth_authentication():
    print("performing inquiry...")

    nearby_devices = bluetooth.discover_devices(
            duration=8, lookup_names=True, flush_cache=True, lookup_class=False)

    print("found %d devices" % len(nearby_devices))

    for addr, name in nearby_devices:
        try:
            if (addr =="A4:50:46:0A:22:70"):
                print(addr)
                break
        except UnicodeEncodeError:
            print("  %s - %s" % (addr, name.encode('utf-8', 'replace')))

