import pickle  # NOQA

from six.moves import map as _map
from six.moves import filter as _filter
from six.moves import zip as _zip


def map(a, b, *c):
    return list(_map(a, b, *c))


def filter(a, b):
    return list(_filter(a, b))


def zip(*a):
    return list(_zip(*a))


from binascii import crc32 as _crc32


# In python3 crc32 was changed to never return a signed value, which is
# different from the python2 implementation. As noted in
# https://docs.python.org/3/library/binascii.html#binascii.crc32
#
# Note the documentation suggests the following:
#
# > Changed in version 3.0: The result is always unsigned. To generate the
# > same numeric value across all Python versions and platforms, use
# > crc32(data) & 0xffffffff.
#
# However this will not work when transitioning between versions, as the
# value MUST match what was generated in python 2.
#
# We can sign the return value using the following bit math to ensure we
# match the python2 output of crc32.
#
# XXX(BYK): This needs to stay as we transitioned from PY2 and still need to
#           keep these compatible due to values stored in various places.
def crc32(*args):
    rt = _crc32(*args)
    return rt - ((rt & 0x80000000) << 1)


import types


def new_module(name):
    return types.ModuleType(name)
